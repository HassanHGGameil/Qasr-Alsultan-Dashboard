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
                price: true
              }
            }
          }
        }
      }
    });

    const monthlyRevenue: { [key: number]: number } = {};

    // Initialize all months with 0
    for (let i = 0; i < 12; i++) {
      monthlyRevenue[i] = 0;
    }

    // Calculate revenue for each order
    for (const order of paidOrders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = 0;

      for (const item of order.orderItem) {
        revenueForOrder += item.product.price;
      }

      monthlyRevenue[month] += revenueForOrder;
    }

    const graphData: GraphDataProps[] = [
      { name: "Jan", total: monthlyRevenue[0] },
      { name: "Feb", total: monthlyRevenue[1] },
      { name: "Mar", total: monthlyRevenue[2] },
      { name: "Apr", total: monthlyRevenue[3] },
      { name: "May", total: monthlyRevenue[4] },
      { name: "Jun", total: monthlyRevenue[5] },
      { name: "Jul", total: monthlyRevenue[6] },
      { name: "Aug", total: monthlyRevenue[7] },
      { name: "Sep", total: monthlyRevenue[8] },
      { name: "Oct", total: monthlyRevenue[9] },
      { name: "Nov", total: monthlyRevenue[10] },
      { name: "Dec", total: monthlyRevenue[11] }, // Fixed typo from "Des" to "Dec"
    ];

    return graphData;
  } catch (error) {
    console.error("Error fetching graph revenue:", error);
    // Return empty data structure instead of crashing
    return [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];
  }
};