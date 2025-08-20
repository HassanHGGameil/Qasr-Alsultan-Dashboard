import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import { createUserSchema, ICreateUserDto } from "@/validations/home/user/user";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

type PageProps = {
  params: Promise<{ userId: string }>;
};





export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    if (!(await params).userId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: (await params).userId,
      },
    });

    if (!user) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const headers = CorsHandler(req);
    return NextResponse.json(user, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}





// PATCH method for updating store details
export async function PATCH(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();

  try {
    const userId = currentUser?.id;
    const body = (await req.json()) as ICreateUserDto;

    // Validate input data using the schema
    const validation = createUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Destructure fields from body
    const { role } = body;

    // Update store
    const user = await prismadb.user.update({
      where: {
        id: (await params).userId,
      },
      data: {
        role,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    axiosErrorHandler(error)
    return new NextResponse("Internal error", { status: 500 });
  }
}

/**
 *
 * @method  DELETE
 * @route   ~/api/stores/[userId]
 * @desc    DELETE Store
 * @access  private (only admin can DELETE store )
 */

export async function DELETE(req: NextRequest, { params }: PageProps) {
  // To Get user Id should be get current user first
  const currentUser = await getCurrentUser();

  try {
    const userId = currentUser?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!(await params).userId) {
      return new NextResponse("BillboardId Id is required", { status: 400 });
    }

    const user = await prismadb.user.deleteMany({
      where: {
        id: (await params).userId,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    axiosErrorHandler(error)

    return new NextResponse("Intrnal error", { status: 500 });
  }
}
