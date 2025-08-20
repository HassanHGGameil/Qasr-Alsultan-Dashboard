import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import {
  createProductAddionsSchema,
  IProductAddionsDto,
} from "@/validations/home/products/productAddions";

import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

/**
 * @method  POST
 * @route   ~/api/stores
 * @desc    Create a new package
 * @access  Private (Only admin can create package)
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: CorsHandler(req),
      });
    }

    const body = (await req.json()) as IProductAddionsDto;
    const validation = createProductAddionsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors.map((err) => err.message) },
        { status: 400, headers: CorsHandler(req) }
      );
    }

    const productAddtions = await prismadb.productAddtions.create({
      data: {
        ...body,
        productItem: {
          createMany: {
            data: body.productItem.map((item) => ({
              nameEn: item.nameEn,
              nameAr: item.nameAr,
              price: item.price,
              quantity: item.quantity,
              productCategoryId: item.productCategoryId,
              imageUrl: item.imageUrl,
            })),
          },
        },
      },
    });

    return NextResponse.json(productAddtions, {
      status: 201,
      headers: CorsHandler(req),
    });
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

/**
 * @method  GET
 * @route   ~/api/stores
 * @desc    Get packages for a store
 * @access  Private
 */
export async function GET(req: NextRequest) {
  try {
    const productAddtions = await prismadb.productAddtions.findMany({
      include: {
        productItem: {
          include: {
            productCategory: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      productAddtions.length === 0 ? [] : productAddtions,
      {
        status: 200,
        headers: CorsHandler(req),
      }
    );
  } catch (error) {
    return axiosErrorHandler(error);
  }
}
