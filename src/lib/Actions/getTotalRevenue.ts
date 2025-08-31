import prismadb from "../prismaDB/prismadb";

export const getTotalRevenue = async () => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true,
    },

    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalRevenue = paidOrders.reduce((total: any, order: { orderItem: any[]; }) => {
    const orderTotal = order.orderItem.reduce((orderSum, item) => {
      return orderSum + item.product.price;
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
