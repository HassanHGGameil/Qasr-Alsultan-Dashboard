import { authOptions } from "@/lib/authOptions"; 

import prisma from "@/lib/prismaDB/prismadb";
import { getServerSession } from "next-auth";

export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session || !session.user?.email) {
      console.warn("No session or email found in session.");
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      console.warn(`No user found with email: ${session.user.email}`);
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updateAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
