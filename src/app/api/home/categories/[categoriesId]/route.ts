import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import { generateSlug } from "@/lib/HandleSlug/slugfy";
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
  params: Promise<{ slug?: string; categoriesId: string }>;
};


export async function GET(req: NextRequest, { params }: PageProps) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    const categories = await prismadb.categories.findUnique({
      where: { id: (await params).categoriesId },
      
    });

    if (!categories) {
      return new NextResponse("categories not found", { status: 404, headers });
    }

    return NextResponse.json(categories, { status: 200, headers });
  } catch (error) {
    console.error("[ORDER_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
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
    const slugEn = generateSlug(body.nameEn);
    const slugAr = generateSlug(body.nameAr, true);

    // Update product
    const categories = await prismadb.categories.update({
      where: {
        id: (await params).categoriesId,
        slugEn: (await params).slug,
        slugAr: (await params).slug,
      },
      data: {
        ...body,
        slugEn,
        slugAr,
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(categories, { headers });
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
    const categories = await prismadb.categories.delete({
      where: {
        slugEn: (await params).slug,
        slugAr: (await params).slug,
        id: (await params).categoriesId,
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(categories, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}
