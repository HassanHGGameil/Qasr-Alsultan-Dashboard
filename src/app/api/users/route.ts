import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import { NextResponse } from "next/server";

/**
 *
 * @method  GET
 * @route   ~/api/stores
 * @desc    Create new store
 * @access  private (only admin can create store)
 */

export async function GET() {

  try {
    const users = await prismadb.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    axiosErrorHandler(error)
    return new NextResponse("Internal Error", { status: 500 });
  }
}
