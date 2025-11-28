"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "@/components/common/Link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useLocale } from "next-intl";
import logo from "../../../../../../public/icons/qasr-alsutan-logo.png";
import AddToCart from "../AddToCard/AddToCard";
import { formater } from "@/lib/utils/utils"; 
import TProduct from "@/types/frontendType/product";

interface ProductCardProps {
  productItem: TProduct;
}

const ProductSlidesCard = ({ productItem }: ProductCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale();

  const { images, titleEn, titleAr, price, id } = productItem;
  const mainImage = images?.[0]?.url || "/placeholder-product.jpg";

  const title = locale === "en" ? titleEn : titleAr;
  const subtitle =
    locale === "en" ? productItem.subtitleEn : productItem.subtitleAr; // Added subtitle extraction

  return (
    <Card
      className="w-full relative max-w-sm overflow-hidden mb-5 dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 dark:border-gray-800 hover:-translate-y-1 border border-gray-100"
      aria-labelledby={`food-title-${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`}>
        <div className="relative aspect-[4/3] m-5">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        <CardHeader className="px-5">
          <div className="flex flex-col justify-between items-start">
            <h3
              id={`food-title-${id}`}
              className="text-sm md:text-md  lg:text-xl font-bold  line-clamp-1"
            >
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-1 text-[10px]">
              {subtitle}
            </p>
          </div>
        </CardHeader>
      </Link>

      <CardFooter className="">
        <div className=" flex items-center  w-full lg:gap-10">
          <AddToCart product={productItem} />

          <span className="text-xs md:text-md lg:text-lg font-bold mx-5 ">
            {formater.format(price)}{" "}
          </span>
        </div>
      </CardFooter>

      <div
        className={`
            absolute top-3 right-3 sm:top-4 sm:right-4
            w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-dark 
            shadow-sm sm:shadow-lg flex items-center justify-center
            bg-slate-800 dark:bg-blue-900/20 p-1 shadow-blue-900/30 dark:shadow-blue-900/30 border border-gray-200 dark:border-green-400/50
            text-green-500 transition-all duration-300 ease-out
            
            hover:text-green-600
          `}
        aria-label="Quick contact"
      >
        <Image
          src={logo || ""}
          alt={"قصر السلطان"}
          width={40}
          height={40}
          loading="lazy"
          className="w-[400px]"
        />
      </div>
    </Card>
  );
};

export default ProductSlidesCard;
