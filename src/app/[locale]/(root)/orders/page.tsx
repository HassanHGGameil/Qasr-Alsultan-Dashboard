import OrderClient from "@/components/PagesActionUi/Orders/OrderClient/OrderClient";
import prismadb from "@/lib/prismaDB/prismadb";
import { formater } from "@/lib/utils/utils";
import OrderColumnType from "@/types/OrderColumnType";
import { format } from "date-fns";

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({
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

  const formattedOrders: OrderColumnType[] = orders.map((item) => {
    const itemsPrice = item.orderItem.reduce((sum, orderItem) => {
      const price = orderItem.product.price || 0;
      const quantity = Number(orderItem.quantity) || 1;
      return sum + price * quantity;
    }, 0);

    return {
      id: item.id,
      phone: item.phone,

      name: item.name || "",

      city: item.city || "",
      branch: item.branch || "",

      zipCode: item.zipCode || "",
      address: item.address,
      isPaid: item.isPaid,
      totalPrice: Number(formater.format(itemsPrice))  ,
      products: item.orderItem
        .map((orderItem) => orderItem.product.titleEn)
        .join(", "),
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
      status: item.status || "PENDING",
      deliveryStatus: item.deliveryStatus || "PENDING",
      paymentMethod: item.paymentMethod || "CASH_ON_DELIVERY",
    };
  });

  return (
    <div className="w-full">
      <div className="p-10">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
