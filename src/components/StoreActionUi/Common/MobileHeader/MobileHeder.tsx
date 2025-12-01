"use client";

import React, { useMemo, useCallback } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BiBookReader } from "react-icons/bi";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

import BasketCart from "../Ecommerce/BasketCart/BasketCart";
import { Routes } from "@/constants/enums";
import { HiOutlinePercentBadge } from "react-icons/hi2";
import { HiOutlineScale } from "react-icons/hi";

const NAV_LINKS = [
  {
    id: "nav-home",
    titleEn: "Home",
    titleAr: "الرئيسية",
    href: Routes.ROOT,
    icon: <IoHomeOutline />,
  },
  {
    id: "nav-menu",
    titleEn: "Menu",
    titleAr: "المنيو",
    href: Routes.MENU,
    icon: <BiBookReader />,
  },
  {
    id: "nav-cart",
    titleEn: "Cart",
    titleAr: "العربة",
    href: Routes.CART,
    icon: <BasketCart className="-right-5 " />,
  },
  {
    id: "nav-offers",
    titleEn: "Offers",
    titleAr: "العروض",
    href: Routes.OFFERS,
    icon: <HiOutlinePercentBadge />,
  },
  
  
  {
    id: "nav-butcher",
    titleEn: "Butcher",
    titleAr: "جزارة",
    href: Routes.BUTCHER,
    icon: <HiOutlineScale />  ,
  },
];

const MobileHeader = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const items = useMemo(() => NAV_LINKS, []);

  const handleNavigation = useCallback(
    (url: string) => router.push(url), // FIXED hydration error
    [router]
  );

  const getActiveClasses = useCallback(
    (isActive: boolean) => ({
      icon: isActive
        ? "text-[#A72703] dark:text-[#FFC50F] scale-110"
        : "text-gray-500 dark:text-gray-300 group-hover:text-[#A72703] dark:group-hover:text-[#FFC50F]",

      line: isActive
        ? "bg-[#A72703] dark:bg-[#FFC50F]"
        : "bg-transparent",

      label: isActive
        ? "text-[#A72703] dark:text-[#FFC50F]"
        : "text-gray-600 dark:text-gray-300",
    }),
    []
  );

  return (
    <header
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="
        lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2
        w-[93%] max-w-[500px] z-[999]
      "
    >
      <div
        className="
          bg-white/90 dark:bg-slate-900/90 
          backdrop-blur-xl border border-white/30 dark:border-slate-700/60
          shadow-2xl shadow-black/20 
          rounded-2xl px-5 py-3
        "
      >
        <nav className="flex items-center justify-between gap-2">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const styles = getActiveClasses(isActive);

            return (
              <button
                key={item.id}
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavigation(item.href)}
                className="
                  w-full flex flex-col items-center group 
                  transition-all duration-300 active:scale-95
                "
              >
                <div
                  className={`text-[26px] transition-all duration-300 ${styles.icon}`}
                >
                  {item.icon}
                </div>

                <div
                  className={`mt-1 h-[3px] w-6 rounded-full transition-all duration-300 ${styles.line}`}
                ></div>

                <span className={`text-[12px] mt-1 font-medium ${styles.label}`}>
                  {locale === "ar" ? item.titleAr : item.titleEn}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default MobileHeader;
