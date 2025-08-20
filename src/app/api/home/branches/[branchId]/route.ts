import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import {
  createCategoriesSchema,
  ICreateCategoriesDto,
} from "@/validations/home/categories/categories";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

type PageProps = {
  params: Promise<{ branchId?: string }>;
};

export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    if (!(await params).branchId) {
      return new NextResponse("ProductId is required", { status: 400 });
    }

    const branches = await prismadb.branches.findUnique({
      where: {
        id: (await params).branchId,
      },
    });

    if (!branches) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const headers = CorsHandler(req);
    return NextResponse.json(branches, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}

/**
 * Handle PATCH Request to update product
 */

export async function PATCH(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();

  // Authentication check
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = (await req.json()) as ICreateCategoriesDto;

    // Validate input data using the schema
    const validation = createCategoriesSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Update product
    const branches = await prismadb.branches.update({
      where: {
        id: (await params).branchId,
      },
      data: {
        ...body,
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(branches, { headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}

/**
 * Handle DELETE Request to remove product
 */

export async function DELETE(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Attempt to delete the product (no user restriction)
    const branches = await prismadb.branches.delete({
      where: {
        id: (await params).branchId,
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(branches, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}
