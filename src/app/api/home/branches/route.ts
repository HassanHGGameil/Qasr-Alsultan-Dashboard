import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import {
  createBranchesSchema,
  ICreateBranchesDto,
} from "@/validations/branches";

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
    const body = (await req.json()) as ICreateBranchesDto;

    // Validate input data
    const validation = createBranchesSchema.safeParse(body);
    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ message: validation.error.errors[0].message }),
        { status: 400, headers }
      );
    }

    // Create product
    const branches = await prismadb.branches.create({
      data: {
        ...body,
      },
    });

    return new NextResponse(JSON.stringify(branches), {
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
    const branches = await prismadb.branches.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!branches.length) {
      return new NextResponse("No products found", { status: 404, headers });
    }

    return new NextResponse(JSON.stringify(branches), {
      status: 200,
      headers,
    });
  } catch (error) {
    axiosErrorHandler(error);
  }
}
