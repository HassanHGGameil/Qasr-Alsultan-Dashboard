"use client";
import React, { useState } from "react";
import Link from "../Link";
import { Routes } from "@/constants/enums";
import { Button } from "@/components/ui/button";
import { Menu, XIcon } from "lucide-react";
import ThemeToggler from "../ThemsToggle/ThemeToggler";
import LocalSelect from "../LocaleSelect/LocalSelect";
import { useLocale } from "next-intl";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const locale = useLocale();

  const links = [
    {
      id: crypto.randomUUID(),
      titleEn: "Home",
      titleAr: "الرئسيه",
      href: Routes.HOME,
    },

    {
      id: crypto.randomUUID(),
      titleEn: "Offers",
      titleAr: "عروض قصر لسلطان",
      href: Routes.COURSES,
    },
    {
      id: crypto.randomUUID(),
      titleEn: "Main Course",
      titleAr: "الاطباق الرئسيه",
      href: Routes.ABOUT,
    },

   
    {
      id: crypto.randomUUID(),
      titleEn: "About QasrAlsutan",
      titleAr: "عن فصر السلطان",
      href: Routes.CONTACT,
    },
    // {
    //   id: crypto.randomUUID(),
    //   title: "Login",
    //   href: `${Routes.AUTH}/${Pages.LOGIN}`,
    // },
  ];

  return (
    <nav className="flex-2 justify-end flex">
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>
      <ul
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-center lg:items-center gap-10`}
      >
        <div className=""></div>
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-10 right-10 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
        {links.map((link) => (
          <li key={link.id} className="">
            <Link
              href={`/${link.href}`}
              onClick={() => setOpenMenu(false)}
              className={`${"text-slate-800 dark:text-white hover:text-primary dark:hover:text-blue-500 duration-200 transition-colors"} 
                 font-medium`}
            >
              {locale === "en" ? link.titleEn : link.titleAr}
            </Link>
          </li>
        ))}

        <ThemeToggler />
        <div className="lg:hidden">
          <LocalSelect defaultValue={locale} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
