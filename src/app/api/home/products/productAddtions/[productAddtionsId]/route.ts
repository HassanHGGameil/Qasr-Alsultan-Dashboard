import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import { createProductAddionsSchema, IProductAddionsDto } from "@/validations/home/products/productAddions";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

type PageProps = {
  params: Promise<{ productAddtionsId: string }>;
};

export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    if (!(await params).productAddtionsId) {
      return new NextResponse("ProductId is required", { status: 400 });
    }

    const productAddtions = await prismadb.productAddtions.findUnique({
      where: {
        id: (await params).productAddtionsId,
      },
      include: {
        productItem: true,
      },
    });

    if (!productAddtions) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const headers = CorsHandler(req);
    return NextResponse.json(productAddtions, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error)
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
    const body = (await req.json()) as IProductAddionsDto;

    // Validate input data using the schema
    const validation = createProductAddionsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

  

    // Update product
    const product = await prismadb.product.update({
      where: {
        id: (await params).productAddtionsId,
      },
      data: {
        ...body,
        
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(product, { headers });
  } catch (error) {
    axiosErrorHandler(error)
  }
}

/**
 * Handle DELETE Request to remove product
 */

export async function DELETE(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();

  // Authentication check (ensure user is logged in)
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Attempt to delete the product (no user restriction)
    const product = await prismadb.productAddtions.delete({
      where: { id: (await params).productAddtionsId },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(product, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error)
  }
}
