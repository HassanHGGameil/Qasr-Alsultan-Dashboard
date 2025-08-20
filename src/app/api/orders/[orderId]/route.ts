import { NextRequest, NextResponse } from "next/server";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

type PageProps = {
  params: Promise<{ orderId: string }>;
};

export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(req: NextRequest, { params }: PageProps) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    const order = await prismadb.order.findUnique({
      where: { id: (await params).orderId },
      include: {
        orderItem: {
          include: {
            product: true,
            user: true,
          },
        },
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404, headers });
    }

    return NextResponse.json(order, { status: 200, headers });
  } catch (error) {
    console.error("[ORDER_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}

export async function PATCH(req: NextRequest, { params }: PageProps) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    const body = await req.json();
    const { status, deliveryStatus, isPaid, phone, address } = body;

    // Get the current order to compare changes
    const currentOrder = await prismadb.order.findUnique({
      where: { id: (await params).orderId },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!currentOrder) {
      return new NextResponse("Order not found", { status: 404, headers });
    }

    // Update the order
    const updatedOrder = await prismadb.order.update({
      where: { id: (await params).orderId },
      data: {
        ...(status && { status }),
        ...(deliveryStatus && { deliveryStatus }),
        ...(typeof isPaid === "boolean" && { isPaid }),
        ...(phone && { phone }),
        ...(address && { address }),
      },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    // Create notifications for status changes

    return NextResponse.json(updatedOrder, { status: 200, headers });
  } catch (error) {
    console.error("[ORDER_PATCH_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}

export async function DELETE(req: NextRequest, { params }: PageProps) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    // Check if the order exists
    const order = await prismadb.order.findUnique({
      where: { id: (await params).orderId },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404, headers });
    }

    // Delete related order items first
    await prismadb.orderItem.deleteMany({
      where: { orderId: (await params).orderId },
    });

    // Delete the order
    await prismadb.order.delete({
      where: { id: (await params).orderId },
    });

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("[ORDER_DELETE_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}
