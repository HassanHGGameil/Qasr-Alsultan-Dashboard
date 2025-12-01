"use client";
import React from "react";
import Link from "../Link";
import Image from "next/image";

import moLogoLight from "../../../../public/icons/qasr-alsutan-logo.png";
import moLogoDark from "../../../../public/icons/qasr-alsutan-logo.png";
import { Routes } from "@/constants/enums";
import LocalSelect from "../LocaleSelect/LocalSelect";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import ThemeToggler from "../ThemsToggle/ThemeToggler";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
// import Navbar from "./Navbar";

const Header = () => {
  const locale = useLocale();

  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 py-2 bg-white/95 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
      <div className="container flex items-center justify-between">
        <div className="w-[60px] lg:w-[75px] bg-white dark:bg-red-900/20 p-1 rounded-2xl  shadow-sm shadow-red-900/30 dark:shadow-red-900/30 flex items-center justify-center border border-gray-200 dark:border-red-800/50">
          <Link href={Routes.ROOT}>
            <Image
              src={theme === "dark" ? moLogoLight : moLogoDark}
              alt="Mansour Sweet Bakery Logo"
              width={456}
              height={456}
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </Link>
        </div>

        <div className="hidden lg:block">
          <div className="  flex items-center gap-5">
            <ThemeToggler />
            <LocalSelect defaultValue={locale} />
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
