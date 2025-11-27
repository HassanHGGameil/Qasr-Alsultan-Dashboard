"use client";
import NewList from "@/components/LogicList/NewList/NewList";
import React from "react";
import ProductSlidesCard from "./ProductSlidesCard";
import { useLocale } from "next-intl";
import { Star, Trophy } from "lucide-react";
import TProduct from "@/types/frontendType/product";

interface ProductClientProps {
  products: TProduct[];
}

const ProductSlideClient = ({ products }: ProductClientProps) => {
  
  const ProductsList = (item: TProduct) => (
    <ProductSlidesCard key={item.id} productItem={item} />
  );

  const locale = useLocale();

  return (
    <section className="container text-center   rounded-lg py-10 my-10 ]">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-red-100 dark:from-amber-900/30 dark:to-red-900/30 px-4 py-2 rounded-full mb-4">
        <Trophy className="h-5 w-5 mx-2 text-amber-600 dark:text-amber-400" />
        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
          {locale === "en" ? "Best Sellers" : "الأكثر مبيعاً"}
        </span>
        <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      </div>
      
      <NewList
        records={products}
        renderItem={ProductsList}
        emptyMessage="There is no category"
      />
    </section>
  );
};

export default ProductSlideClient;
