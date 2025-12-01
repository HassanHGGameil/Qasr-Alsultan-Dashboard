"use client";
import React, { useState, useCallback } from "react";
import { Routes } from "@/constants/enums";
import { Button } from "@/components/ui/button";
import { Menu, XIcon } from "lucide-react";
import ThemeToggler from "@/components/common/ThemsToggle/ThemeToggler";
import LocalSelect from "@/components/common/LocaleSelect/LocalSelect";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import BasketCart from "../Ecommerce/BasketCart/BasketCart";
import Link from "@/components/common/Link";

const NAV_LINKS = [
  {
    id: "nav-home",
    titleEn: "Home",
    titleAr: "الرئسيه",
    href: Routes.ROOT,
  },
  {
    id: "nav-offers",
    titleEn: "Offers",
    titleAr: "عروض",
    href: Routes.OFFERS,
  },
  {
    id: "nav-menu",
    titleEn: "Menu",
    titleAr: "المنيو",
    href: Routes.MENU,
  },
  {
    id: "nav-butcher",
    titleEn: "Qasr Alsultan Butcher",
    titleAr: "جزاره قصر السلطان",
    href: Routes.BUTCHER,
  },
  {
    id: "nav-branches",
    titleEn: "Branches",
    titleAr: "الفروع",
    href: Routes.BRANCHES,
  },
  {
    id: "nav-about",
    titleEn: "About QasrAlsutan",
    titleAr: "عن فصر السلطان",
    href: Routes.ABOUT,
  },
];


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = useCallback(
    (href: string) => {
      const normalizedHref = href === "/" ? "" : href.replace(/^\/+/, "");
      const normalizedPath = pathname
        .replace(new RegExp(`^/${locale}`), "")
        .replace(/^\/+/, "");

      if (href === "/" || href === "") {
        return (
          normalizedPath === "" || pathname === `/${locale}` || pathname === "/"
        );
      }
      return (
        normalizedPath === normalizedHref ||
        pathname === `/${locale}/${normalizedHref}`
      );
    },
    [pathname, locale]
  );

  const toggleMenu = () => setOpenMenu((prev) => !prev);
  const closeMenu = () => setOpenMenu(false);

  return (
    <nav className="flex-2 justify-end flex">
      <div className="lg:hidden flex items-center gap-4">
        <BasketCart />
        <Button
          variant="secondary"
          size="sm"
          className="lg:hidden"
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={openMenu}
        >
          <Menu className="!w-6 !h-6" />
        </Button>
      </div>

      {openMenu && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={closeMenu}
        />
      )}

      <ul
        className={`fixed lg:static ${
          openMenu ? `${locale === "en" ? "left-0" : "right-0"}` : "-left-full"
        } top-0 w-4/5 sm:w-3/5 lg:w-auto px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row flex items-center lg:items-center gap-6 lg:gap-8 z-50`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-10 right-10 lg:hidden"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <XIcon className="!w-6 !h-6" />
        </Button>

        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${link.href}`}
              onClick={closeMenu}
              className={cn(
                "text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary",
                "transition-colors duration-200 font-medium",
                "relative dark:after:bg-green-600",
                "after:transition-all after:duration-300 after:w-0 hover:after:w-full",
                isActive(`/${link.href}`) &&
                  "bg-red-700 px-2 hover:text-white dark:hover:text-white dark:bg-yellow-400 text-white rounded-lg dark:text-white after:w-full"
              )}
            >
              {locale === "en" ? link.titleEn : link.titleAr}
            </Link>
          </li>
        ))}

        <div className="">
          <div className="flex items-center gap-4 mt-6 lg:mt-0">
            
            <LocalSelect defaultValue={locale} className="  lg:hidden" />
            
            <ThemeToggler />
            <BasketCart />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
