import getCurrentUser from "@/actions/getCurrentUser";
import AdminSidebar from "@/components/common/AdminHeader/AdminSideBar";
import Header from "@/components/common/Header";
import { redirect } from "@/i18n/routing";
import { DOMAIN } from "@/lib/constains/constains";
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
}

const MainLayout = async ({ children }: IAdmin) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect({
      href: `${DOMAIN}/en/auth/sign-in`,
      locale: "en",
    });
    return null;
  }

  return (
    <>
      <main className="">
        <Header />

        <div className="flex w-full">
          <div className="hidden lg:block">
            <AdminSidebar />
          </div>
          <div className="flex w-full">{children}</div>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
