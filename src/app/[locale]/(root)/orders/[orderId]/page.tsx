import { OrderDetails } from "@/components/PagesActionUi/Orders/OrderDetails/OrderDetails";
import prismadb from "@/lib/prismaDB/prismadb";
import { formater } from "@/lib/utils/utils";
import { DeliveryStatus, OrderStatus, PaymentMethod } from "@prisma/client";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ orderId: string }>;
};

interface OrderDetailsType {
  id: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  name: string;
  phone: string;
  address: string;
  branch: string;
  isPaid: boolean;
  totalPrice: number;
  status: OrderStatus;
  deliveryStatus?: DeliveryStatus | null;
  paymentMethod?: PaymentMethod | null;
  products: Array<{
    id: string;
    productId: string;
    name: string;
    quantity: number; // Changed to strictly number
    price: number;
    image: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

const OrderDetailsPage = async ({ params }: PageProps) => {
  try {
    const order = await prismadb.order.findUnique({
      where: { id: (await params).orderId },
      include: {
        orderItem: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    
    if (!order) {
      return notFound();
    }

    const itemsPrice = order.orderItem.reduce((sum, orderItem) => {
      const price = orderItem.product.price || 0;
      const quantity = orderItem.quantity || 1;
      return sum + price * quantity;
    }, 0);

    const formattedOrder: OrderDetailsType = {
      id: order.id,
      name: order.name,
      branch: order.branch,
      phone: order.phone || "Not provided",
      address: order.address || "Not provided",
      isPaid: order.isPaid || false,
      totalPrice: itemsPrice ?? 0,
      status: order.status || OrderStatus.PENDING,
      deliveryStatus: order.deliveryStatus || null,
      paymentMethod: order.paymentMethod || null,
      products: order.orderItem.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product?.titleAr || "Unknown Product",
        quantity: Number(item.quantity) || 0, // Ensure this is always a number
        price: item.product?.price ?? 0,
        image: item.product?.images?.[0]?.url,
        totalPrice: formater.format(Number(order.totalPrice)) ?? 0,
      })),
      createdAt: order.createdAt.toISOString(),
      updatedAt:
        order.updatedAt?.toISOString() || order.createdAt.toISOString(),
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <OrderDetails order={formattedOrder} />
      </div>
    );
  } catch (error) {
    console.error(`Failed to fetch order ${(await params).orderId}:`, error);
    return notFound();
  }
};

export default OrderDetailsPage;
