import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

/**
 * GET - Fetch Products for a Store
 * @method GET
 * @route ~/api/products/search?searchText=value
 * @access private
 */

export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const searchText = req.nextUrl.searchParams.get("searchText")?.trim();

    let products;
    if (searchText) {
      products = await prismadb.product.findMany({
        where: {
          OR: [
            {
              titleEn: {
                startsWith: searchText,
                mode: "insensitive",
              },
            },
            {
              titleAr: {
                startsWith: searchText,
                mode: "insensitive",
              },
            },
          ],
        },

        include: {
          images: true,
          categories: true,
        },
      });
    } else {
      products = await prismadb.product.findMany({ take: 4 });
    }

    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers,
    });
  }
}
