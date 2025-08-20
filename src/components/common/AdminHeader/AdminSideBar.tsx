"use client";
import React from "react";
import markuplogo from "../../../../public/icons/qasr-alsutan-logo.png";
import Image from "next/image";
import MainNav from "../MainNav/MainNav";

const AdminSidebar = () => {
  return (
    <div
      className="dark:bg-slate-900 shadow-xl h-screen left-0 top-0 sticky p-10 overflow-y-auto"
      style={{ direction: "rtl" }} // Moves scrollbar to the left
    >
      <div className="flex flex-col items-center justify-between" style={{ direction: "ltr" }}>
        <div>
          <MainNav className="flex flex-col items-start gap-3" />
        </div>

        <div className="mt-5 bg-white p-2 shadow-sm rounded-lg dark:shadow-lg dark:shadow-gray-500">
          <Image
            src={markuplogo}
            width={100}
            height={100}
            alt="markup-logo"
            className="w-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
