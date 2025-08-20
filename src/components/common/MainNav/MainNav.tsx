"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  IoBagCheckOutline,
  IoImageOutline,
  IoListOutline,
  IoPricetagsOutline,
} from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { SiPkgsrc } from "react-icons/si";
import { HiCollection } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Link from "../Link";

type NavItem = {
  id: number;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
};

type NavLink = NavItem & {
  href: string;
  isMenu?: false;
};

type NavMenu = NavItem & {
  isMenu: true;
  menuKey: string;
  children: NavLink[];
};

type NavRoute = NavLink | NavMenu;

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menuKey: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const routes: NavRoute[] = [
    {
      id: 1,
      href: "/",
      label: "Overview",
      icon: <IoBagCheckOutline />,
    },
    {
      id: 2,
      href: "/users",
      label: "Users",
      icon: <PiUsersThreeLight />,
    },
    {
      id: 3,
      href: "/heros",
      label: "Hero",
      icon: <IoImageOutline />,
    },
    {
      id: 4,
      href: "/billboards",
      label: "Billboard",
      icon: <IoPricetagsOutline />,
    },
    {
      id: 5,
      href: "/home/branches",
      label: "Branches",
      icon: <IoListOutline />,
    },
    {
      id: 6,
      href: "/home/categories",
      label: "Categories",
      icon: <IoListOutline />,
    },

    {
      id: 7,
      label: "Products",
      icon: <SiPkgsrc />,
      isMenu: true,
      menuKey: "products",
      children: [
        { id: 71, href: `/home/products/productCategory`, label: "Category" },
        { id: 72, href: "/home/products/productAddtions", label: "Addtions" },
        { id: 73, href: "/home/products/product", label: "Products" },
      ],
    },
    {
      id: 8,
      label: "Orders",
      icon: <HiCollection />,
      isMenu: true,
      menuKey: "orders",
      children: [{ id: 81, href: "/orders", label: "Orders" }],
    },
  ];

  const isActive = (href: string) => pathname === href;
  const isChildActive = (children: NavLink[]) =>
    children.some((child) => isActive(child.href));

  const renderLink = (route: NavLink) => (
    <Link
      key={route.id}
      href={route.href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive(route.href)
          ? "bg-[#FFD500] text-blue-700"
          : "text-blue-950 dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-400",
        route.disabled && "opacity-50 cursor-not-allowed"
      )}
      aria-disabled={route.disabled}
    >
      {route.icon && <span className="text-lg">{route.icon}</span>}
      {route.label}
    </Link>
  );

  const renderMenu = (route: NavMenu) => (
    <div key={route.id}>
      <button
        onClick={() => toggleMenu(route.menuKey)}
        className={cn(
          "flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors",
          openMenus[route.menuKey] || isChildActive(route.children)
            ? "bg-[#FFD500] text-blue-700"
            : "text-blue-950 dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-400"
        )}
        aria-expanded={openMenus[route.menuKey]}
        aria-controls={`submenu-${route.menuKey}`}
      >
        <span className="flex items-center gap-3">
          {route.icon && <span className="text-lg">{route.icon}</span>}
          {route.label}
        </span>
        <ChevronDown
          className={cn(
            "transition-transform duration-200",
            openMenus[route.menuKey] ? "rotate-180" : ""
          )}
        />
      </button>
      <AnimatePresence>
        {openMenus[route.menuKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-6 mt-1 overflow-hidden"
            id={`submenu-${route.menuKey}`}
          >
            {route.children.map((subRoute) => (
              <Link
                key={subRoute.id}
                href={subRoute.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(subRoute.href)
                    ? "bg-[#FFD500]/80 text-blue-700"
                    : "text-blue-950 dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-400",
                  subRoute.disabled && "opacity-50 cursor-not-allowed"
                )}
                aria-disabled={subRoute.disabled}
              >
                {subRoute.icon && (
                  <span className="text-lg">{subRoute.icon}</span>
                )}
                {subRoute.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <nav
      className={cn("w-full space-y-1", className)}
      aria-label="Main navigation"
      {...props}
    >
      {routes.map((route) =>
        route.isMenu ? renderMenu(route) : renderLink(route)
      )}
    </nav>
  );
};

export default MainNav;
