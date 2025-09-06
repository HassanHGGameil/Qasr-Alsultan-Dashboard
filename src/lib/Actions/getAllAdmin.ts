import prismadb from "../prismaDB/prismadb";

export const getAllAdmin = async () => {
  try {
    const mobileUserCount = await prismadb.user.count({
      where: {
        userPlatform: "DASHBOARD",
      },
    });

    return mobileUserCount;
  } catch (error) {
    console.error("Error fetching mobile user count:", error);
    throw new Error("Failed to fetch mobile user count");
  }
};
