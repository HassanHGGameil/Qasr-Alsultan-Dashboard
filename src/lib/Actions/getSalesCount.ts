import prismadb from "../prismaDB/prismadb"




export const getSalesCount = async () => {
    const salesCount = await prismadb.order.count({
        where: {
            isPaid: true,
        },
    });

    return salesCount;
}