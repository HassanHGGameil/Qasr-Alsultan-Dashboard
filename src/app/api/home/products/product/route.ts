import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import { generateSlug } from "@/lib/HandleSlug/slugfy";
import prismadb from "@/lib/prismaDB/prismadb";
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

/**
 * POST - Create a New Product
 * @method POST
 * @route ~/api/stores
 * @access private
 */

export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401, headers });
  }

  try {
    const body = (await req.json()) as IProductDto;

    // Validate input data
    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ message: validation.error.errors[0].message }),
        { status: 400, headers }
      );
    }

    const slugEn = generateSlug(body.titleEn);
    const slugAr = generateSlug(body.titleAr, true);

    // Create product
    const product = await prismadb.product.create({
      data: {
        ...body,
        slugEn,
        slugAr,
        images: {
          createMany: {
            data: body.images.map((image) => ({ url: image.url })),
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 201, headers });
  } catch (error) {
    console.error("[PRODUCTS_POST_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}

/**
 * GET - Fetch Products for a Store
 * @method GET
 * @route ~/api/stores
 * @access private
 */

export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const { searchParams } = new URL(req.url);
    const categoriesId = searchParams.get("categoriesId") || undefined;
    const slugEn = searchParams.get("slugEn") || undefined;
    const slugAr = searchParams.get("slugAr") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    // Fetch products
    const products = await prismadb.product.findMany({
      where: {
        categoriesId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        categories: {
          slugEn,
          slugAr,
        },
      },
      include: {
        images: true,
        categories: true,
        productAddtions: {
          include: {
            productItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!products.length) {
      return new NextResponse("No products found", { status: 404, headers });
    }

    return new NextResponse(JSON.stringify(products), { status: 200, headers });
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}
