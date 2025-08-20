import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import { createProductCategorySchema, ICreateProductCategoryDto } from "@/validations/home/products/productCategory";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

type PageProps = {
  params: Promise<{ productCategoryId: string }>;
};

export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    if (!(await params).productCategoryId) {
      return new NextResponse("ProductId is required", { status: 400 });
    }

    const productCategory = await prismadb.productCategory.findUnique({
      where: {
        id: (await params).productCategoryId,
      },
      
    });

    if (!productCategory) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const headers = CorsHandler(req);
    return NextResponse.json(productCategory, { status: 200, headers });
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
    const body = (await req.json()) as ICreateProductCategoryDto;

    // Validate input data using the schema
    const validation = createProductCategorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

  

    // Update product
    const productCategory = await prismadb.productCategory.update({
      where: {
        id: (await params).productCategoryId,
      },
      data: {
        ...body,
        
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(productCategory, { headers });
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
    const productCategory = await prismadb.productCategory.delete({
      where: { id: (await params).productCategoryId },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(productCategory, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error)
  }
}