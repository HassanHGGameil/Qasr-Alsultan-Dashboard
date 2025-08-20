import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import { generateSlug } from "@/lib/HandleSlug/slugfy";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import {
  IProductDto,
  productSchema,
} from "@/validations/home/products/product";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

type PageProps = {
  params: Promise<{ productId?: string }>;
};

export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    if (!(await params).productId) {
      return new NextResponse("ProductId is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: (await params).productId,
      },
      include: {
        images: true,
        productAddtions: {
          include: {
            productItem: true,
          },
        },
        categories: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const headers = CorsHandler(req);
    return NextResponse.json(product, { status: 200, headers });
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
    const body = (await req.json()) as IProductDto;

    // Validate input data using the schema
    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const slugEn = generateSlug(body.titleEn);
    const slugAr = generateSlug(body.titleAr, true);

    // Update product
    const product = await prismadb.product.update({
      where: {
        id: (await params).productId,
      },
      data: {
        ...body,
        slugEn,
        slugAr,
        images: {
          deleteMany: {}, // Remove all existing images
          createMany: {
            data: body.images.map((image) => ({ url: image.url })),
          },
        },
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(product, { headers });
  } catch (error) {
    axiosErrorHandler(error);
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
    const product = await prismadb.product.delete({
      where: {
        id: (await params).productId,
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(product, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}
