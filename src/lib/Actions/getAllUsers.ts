import prismadb from "../prismaDB/prismadb"

export const getAllUsersCount = async () => {
    try {
        const userCount = await prismadb.user.count();
        return userCount;
    } catch (error) {
        console.error("Error fetching user count:", error);
        throw new Error("Failed to fetch user count");
    }
}




