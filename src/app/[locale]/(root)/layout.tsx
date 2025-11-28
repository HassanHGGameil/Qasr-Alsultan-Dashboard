
import Footer from "@/components/StoreActionUi/Common/footer";
import Header from "@/components/StoreActionUi/Common/Header";
import FirstHeaer from "@/components/StoreActionUi/Common/Header/FirstHeaer";
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
}

const MainLayout = async ({ children }: IAdmin) => {
  return (
    <>
      <main className="">
        <FirstHeaer />
        <Header />

        {children}
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;
