// "use client";
// import { Link } from "@/navigation";
// import React, { useState } from "react";

// import { TbCategory2 } from "react-icons/tb";


// import style from "./style.module.css";
// import ProfileMenu from "../ProfileMenu/ProfileMenu";
// import MobileNav from "./MobileNavDailog";



// interface MenuType {
//   name?: string;
//   path?: string;
//   icon?: any;
// }

// const Menu: MenuType[] = [
//   {
//     name: "Shop",
//     path: "/",
//     icon: <TbCategory2 />,
//   },

//   // {
//   //   name: "Wishlist",
//   //   path: "/wishlist",
//   //   icon: <Wishlist cart_badge={wislist_badge} />,
//   // },

//   // {
//   //   name: "Cart",
//   //   path: "/cart",
//   //   icon: <BasketCart cart_badge={cart_badge} />,
//   // },

//   // {
//   //   name: "Chat",
//   //   path: "/",
//   //   icon: <IoLogoWhatsapp className="text-green-500 text-[28px]" />,
//   // },
// ];

// function MobileHeader() {

    
  
//   return (
//     <header>
//       <div className="lg:hidden  bg-white  dark:text-slate-800 py-2 w-full fixed bottom-0 mb-2 z-[999] rounded-3xl shadow-2xl">
//         <nav className="container flex gap-4 items-center justify-between">
          

//           <div className="flex flex-col items-center gap-2 text-[17px] mt-1 cursor-pointer">
//           <TbCategory2 />
//             <span className="text-[10px] font-semibold">Overview</span>
//           </div>

//           <div className="text-[17px] mt-1 cursor-pointer" >
//             <MobileNav />
//           </div>

//           <div className="flex items-center flex-col">
//             <ProfileMenu />
//             <span className="text-[10px] font-semibold">Account</span>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default MobileHeader;
