import getCurrentUser from "@/actions/getCurrentUser";
import { CorsHandler } from "@/lib/CorsHandler/CorsHndler";
import prismadb from "@/lib/prismaDB/prismadb";
import { axiosErrorHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import OrderColumnType from "@/types/OrderColumnType";
import { format } from "date-fns";
import { broadcastNewOrder } from "@/lib/SSE-Sockit/sseMesenger";

interface OrderItem {
  id: string;
  quantity: number;
  params: Promise<{ id: string }>;
  productAdditions?: {
    productItem?: {
      nameEn: string;
      nameAr: string;
      price: number;
      quantity: number;
      totalPrice: number;
      imageUrl: string;
    }[];
  };
}

// Handle Preflight Requests (OPTIONS)
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  headers.set("Content-Length", "0");
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(req: Request) {
  const headers = CorsHandler(req as NextRequest);

  try {
    const { items, paymentMethod, customer } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new NextResponse("Items are required", { status: 400, headers });
    }

    const order = await prismadb.order.create({
      data: {
        isPaid: false,
        status: "PENDING",
        deliveryStatus: "PENDING",
        paymentMethod,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        branch: customer.branch,
        zipCode: customer.zipCode,
        orderItem: {
          create: items.map((item: OrderItem) => ({
            productId: item.id,
            quantity: item.quantity,
            additions: item.productAdditions?.productItem,
          })),
        },
      },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    // Format order for real-time emission
    const itemsPrice = order.orderItem.reduce((sum, orderItem) => {
      const price = orderItem.product.price || 0;
      const quantity = Number(orderItem.quantity) || 1;
      return sum + price * quantity;
    }, 0);

    const formattedOrder: OrderColumnType = {
      id: order.id,
      phone: order.phone,
      name: order.name || "",
      city: order.city || "",
      zipCode: order.zipCode || "",
      branch: customer.branch,
      address: order.address,
      isPaid: order.isPaid,
      totalPrice: itemsPrice,
      products: order.orderItem
        .map((orderItem) => orderItem.product.titleEn)
        .join(", "),
      createdAt: format(order.createdAt, "MMMM do, yyyy"),
      status: order.status || "PENDING",
      deliveryStatus: order.deliveryStatus || "PENDING",
      paymentMethod: order.paymentMethod || "CASH_ON_DELIVERY",
    };

    // Broadcast new order event via Server-Sent Events for real-time updates
    try {
      broadcastNewOrder(formattedOrder);
      console.log("New order broadcasted via SSE:", formattedOrder.id);
    } catch (error) {
      console.error("Failed to broadcast new order:", error);
    }

    return NextResponse.json(order, { status: 201, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}

export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    const orders = await prismadb.order.findMany({
      where: {
        // userId: currentUser.id, // Only fetch orders for the current user
      },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders, { status: 200, headers });
  } catch (error) {
    console.error("[ORDERS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}

export async function DELETE(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: headers,
      });
    }

    // Using transaction to ensure both deletions succeed or fail together
    await prismadb.$transaction([
      prismadb.orderItem.deleteMany(),
      prismadb.order.deleteMany(),
    ]);

    return NextResponse.json(
      { message: "All orders deleted successfully" },
      { headers: headers }
    );
  } catch (error) {
    console.error("Error deleting orders:", error);

    // Make sure the error handler also includes CORS headers
    const response = axiosErrorHandler(error);
    return new NextResponse(response.message, {
      status: response.statusCode,
      headers: headers,
    });
  }
}
