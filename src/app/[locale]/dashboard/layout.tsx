"use client";

import AdminSidebar from "@/components/common/AdminHeader/AdminSideBar";
import Header from "@/components/common/Header";
import { DOMAIN } from "@/lib/constains/constains";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface IAdmin {
  children: ReactNode;
}

const MainLayout = ({ children }: IAdmin) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`${DOMAIN}/en/auth/sign-in`);
    }
  }, [status, router]);

  // Optional: show nothing while loading
  if (status === "loading") return null;

  if (!session?.user) return null;

  return (
    <main className="">
      <Header />
      <div className="flex w-full">
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="flex w-full">{children}</div>
      </div>
    </main>
  );
};

export default MainLayout;
