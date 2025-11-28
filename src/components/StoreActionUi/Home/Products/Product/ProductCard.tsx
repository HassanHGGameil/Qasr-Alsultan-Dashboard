"use client";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import AddToCart from "../AddToCard/AddToCard";
import type TProduct from "@/types/frontendType/product";
import DialogPopUp from "@/components/common/Dialog-PopUp/PopUp";
import { Link } from "@/i18n/routing";
import { formater } from "@/lib/utils/utils";

interface ProductCardProps {
  productItem: TProduct;
}

const ProductCard = ({ productItem }: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  const { images, titleEn, titleAr, subtitleEn, subtitleAr, price, id } =
    productItem;

  const title = locale === "en" ? titleEn : titleAr;
  const subtitle = locale === "en" ? subtitleEn : subtitleAr;
  const mainImage = images?.[0]?.url || "/placeholder-product.jpg";

  return (
    <Card
      className="w-full max-w-sm overflow-hidden dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 dark:border-gray-800 hover:-translate-y-1 border border-gray-100"
      aria-labelledby={`food-title-${id}`}
    >
      <Link href={`/products/${id}`}>
        <DialogPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} />

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
              className="text-sm md:text-md lg:text-xl font-bold  line-clamp-1"
            >
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-1 text-[10px]">
              {subtitle}
            </p>
          </div>
        </CardHeader>
      </Link>

      <CardFooter className="px-5">
        <div className="w-full flex items-center gap-3">
          <AddToCart product={productItem} />

          <div className="flex justify-between items-center">
            <div className="">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-md lg:text-xl font-bold ">
                  {formater.format(price)}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;