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
    const body = (await req.json()) as ICreateCategoriesDto;

    // Validate input data
    const validation = createCategoriesSchema.safeParse(body);
    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ message: validation.error.errors[0].message }),
        { status: 400, headers }
      );
    }

    const slugEn = generateSlug(body.nameEn);
    const slugAr = generateSlug(body.nameAr, true);

    // Create product
    const categories = await prismadb.categories.create({
      data: {
        ...body,
        slugEn,
        slugAr,
      },
    });

    return new NextResponse(JSON.stringify(categories), {
      status: 201,
      headers,
    });
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
    const categories = await prismadb.categories.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!categories.length) {
      return new NextResponse("No products found", { status: 404, headers });
    }

    return new NextResponse(JSON.stringify(categories), {
      status: 200,
      headers,
    });
  } catch (error) {
    axiosErrorHandler(error);
  }
}
