import Header from "@/components/common/Header";
import { Metadata } from "next";
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
  
}

export const metadata: Metadata = {
  title: {
    default: "Auth",
    template: "%s | Qasr Alsultan",
  },
  
};

function AuthLayout({ children }: IAdmin) {
  return (
    <main>
      <Header />
      <div className=" mt-[2rem] py-2">{children}</div>
    </main>
  );
}

export default AuthLayout;
