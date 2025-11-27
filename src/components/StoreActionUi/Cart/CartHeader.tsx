"use client";

import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useLocale } from "next-intl";
import React from "react";

const CartHeader = () => {
  const locale = useLocale();
  return (
    <section>
      <div className="container  text-center my-5">
        <Badge
          variant="outline"
          className="flex items-center gap-5 justify-center"
        >
          <h1 className="text-center text-xl font-semibold py-5">
            {locale === "en" ? "Welcome In Your Cart" : "السلة الخاصة بك"}
          </h1>
          <ShoppingCart className="w-8 h-8 text-muted-foreground text-red-800 dark:text-white " />
        </Badge>
      </div>
    </section>
  );
};

export default CartHeader;
