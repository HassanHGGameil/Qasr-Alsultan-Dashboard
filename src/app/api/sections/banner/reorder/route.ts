import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}



export async function PUT(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    const { list } = await req.json();

    if (!Array.isArray(list) || list.length === 0) {
      return new NextResponse("Invalid list data", { status: 400, headers });
    }

    // ✅ Use Promise.all for parallel updates instead of sequential await
    await Promise.all(
      list.map((item) =>
        prismadb.hero.update({
          where: { id: item.id },
          data: { position: item.position },
        })
      )
    );

    return NextResponse.json({ message: "Success" },  { status: 200, headers });
  } catch (error) {
    console.error("Error updating course chapters:", error);
    axiosErrorHandler(error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}
