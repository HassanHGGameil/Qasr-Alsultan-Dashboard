"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import lightlogo from "../../../../../public/icons/qasr-alsutan-logo.png";
import darklogo from "../../../../../public/icons/qasr-alsutan-logo.png";
import Link from "@/components/common/Link";

const FooterLogo = () => {
  const { theme } = useTheme();

  return (
    <Link href="/" className="inline-block" aria-label="Mansour Sweets">
      <div className="w-28 h-28 bg-white dark:bg-red-900/20 rounded-2xl p-2 shadow-xl dark:shadow-red-900/30 flex items-center justify-center border border-gray-200 dark:border-red-800/50 mx-auto md:mx-0">
        <Image
          src={theme === "light" ? lightlogo : darklogo}
          alt="Mansour Logo"
          className="w-full transition-all duration-700 hover:rotate-6 hover:scale-105"
          width={112}
          height={112}
          priority
          loading="eager"
        />
      </div>
    </Link>
  );
};

export default FooterLogo;
