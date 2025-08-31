import prismadb from "../prismaDB/prismadb";

interface GraphDataProps {
  name: string;
  total: number;
}



export const getGraphRevenue = async (): Promise<GraphDataProps[]> => {
  try {
    const paidOrders = await prismadb.order.findMany({
      where: {
        isPaid: true,
      },
      include: {
        orderItem: {
          include: {
            product: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

   // Initialize all months with 0
const monthlyRevenue: Record<number, number> = Array.from({ length: 12 }, (_, i) => [i, 0])
  .reduce((acc, [i]) => {
    acc[i] = 0;
    return acc;
  }, {} as Record<number, number>);

for (const order of paidOrders) {
  const month = order.createdAt.getMonth(); // 0 = Jan
  const revenueForOrder = order.orderItem.reduce((sum, item) => {
    return sum + (Number(item.product.price) || 0) * Number(item.quantity);
  }, 0);

  monthlyRevenue[month] += revenueForOrder;
}

    // Create graph data for all months, ensuring consistent order
    const graphData: GraphDataProps[] = [
      { name: "Jan", total: monthlyRevenue[0] || 0 },
      { name: "Feb", total: monthlyRevenue[1] || 0 },
      { name: "Mar", total: monthlyRevenue[2] || 0 },
      { name: "Apr", total: monthlyRevenue[3] || 0 },
      { name: "May", total: monthlyRevenue[4] || 0 },
      { name: "Jun", total: monthlyRevenue[5] || 0 },
      { name: "Jul", total: monthlyRevenue[6] || 0 },
      { name: "Aug", total: monthlyRevenue[7] || 0 },
      { name: "Sep", total: monthlyRevenue[8] || 0 },
      { name: "Oct", total: monthlyRevenue[9] || 0 },
      { name: "Nov", total: monthlyRevenue[10] || 0 },
      { name: "Dec", total: monthlyRevenue[11] || 0 },
    ];

    return graphData;
  } catch (error) {
    console.error("Error fetching graph revenue:", error);
    // Return empty data instead of throwing to prevent frontend crashes
    return Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString("default", { month: "short" }),
      total: 0,
    }));
  }
};
