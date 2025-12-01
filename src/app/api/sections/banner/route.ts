import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import { generateSlug } from "@/lib/HandleSlug/slugfy";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import { BannerSchema, IBannerDto } from "@/validations/sections/banner";


import { NextRequest, NextResponse } from "next/server";

// ✅ Handle CORS preflight requests
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

/**
 * POST - Create a new Export Service
 * @method POST
 * @route ~/api/export-services
 * @access private (requires logged-in user)
 */
export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401, headers });
  }

  try {
    const body = (await req.json()) as IBannerDto;

    // ✅ Validate input data
    const validation = BannerSchema.safeParse(body);
    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ message: validation.error.errors[0].message }),
        { status: 400, headers }
      );
    }

    const slug = generateSlug(body.titleEn)
      ? generateSlug(body.titleEn)
      : generateSlug(body.titleAr, true);

    const lastBanner = await prismadb.banner.findFirst({
      orderBy: { position: "desc" },
    });
    const newPosition = lastBanner ? Number(lastBanner.position) + 1 : 1;

    // ✅ Create the Export Service with nested features
    const banner = await prismadb.banner.create({
      data: {
        slug,
        ...body,
        position: newPosition,
        bannerImages: {
          createMany: {
            data: body.bannerImages.map((image) => ({ url: image.url })),
          },
        },
      },
      include: {
        bannerImages: true,
      },
    });

    return new NextResponse(JSON.stringify(banner), {
      status: 201,
      headers,
    });
  } catch (error) {
    console.error("[EXPORT_SERVICES_POST_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}

/**
 * GET - Fetch all Export Services
 * @method GET
 * @route ~/api/export-services
 * @access public
 */
export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const banner = await prismadb.banner.findMany({
      include: {
        bannerImages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!banner.length) {
      return new NextResponse("No export services found", {
        status: 404,
        headers,
      });
    }

    return new NextResponse(JSON.stringify(banner), {
      status: 200,
      headers,
    });
  } catch (error) {
    return axiosErrorHandler(error);
  }
}
