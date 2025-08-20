import React from "react";
// import getCurrentUser from "@/actions/getCurrentUser";
import Image from "next/image";
import darklogo from "../../../../public/icons/logo-mark.png";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import ThemeToggler from "../ThemsToggle/ThemeToggler";

const AdminNavbar = async () => {
  // const currentUser = await getCurrentUser();

  return (
    <div className="border-b ">
      <div className=" flex   items-center h-16 mx-5 justify-between  ">
        <div className="flex items-center gap-3">
          <div className="w-[40px] md:w-[50px] lg:w-[60px]  bg-white rounded-full flex items-center justify-center shadow-md dark:shadow-lg dark:shadow-gray-500 ">
            <Image
              src={darklogo}
              alt="logo"
              width={400}
              height={400}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <h3 className="hidden lg:block">Welcome In Mansour Dashboard</h3>
          <ThemeToggler />
        </div>

        <div className="hidden lg:block">
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
