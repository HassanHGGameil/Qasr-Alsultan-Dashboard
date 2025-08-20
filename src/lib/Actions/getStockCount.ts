
import prismadb from "../prismaDB/prismadb"




export const getStockCount = async () => {
    const stockCount = await prismadb.product.count({
        where: {
            isArchived: false
        },
    });

    return stockCount;
}