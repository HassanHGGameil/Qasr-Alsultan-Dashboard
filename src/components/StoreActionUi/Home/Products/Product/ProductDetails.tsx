'use client'
import { useLocale } from "next-intl";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

import { RiPlantLine } from "react-icons/ri";
import Gallery from "@/components/common/Gallery/Gallery";
import AddToCart from "../AddToCard/AddToCard";
import TProduct from "@/types/frontendType/product";

interface ProductDetailsCardProps {
  productDetails: TProduct;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  productDetails,
}) => {
  const locale = useLocale();
  const {
    titleEn,
    titleAr,
    subtitleEn,
    subtitleAr,
    images = [],
  } = productDetails;

  const title = locale === "en" ? titleEn : titleAr;
  const subtitle = locale === "en" ? subtitleEn : subtitleAr;

  const formattedImages = images.map((img, index) => ({
    url: img.url,
    id: `image-${index}`, // Generate a unique id if not provided
    // Add any other required ImageType properties here
  }));

  return (
    <section className="container  ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
        {/* Product Image with Gallery */}
        <div className="flex flex-col gap-4">
          <div className="sm:col-span-4 lg:col-span-5">
            <Gallery className="" images={formattedImages} Alt={title} />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8 ">
          <div className="border-b pb-6">
            <h1 className="text-4xl font-bold  mb-2">{title}</h1>
            {subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
              <RiPlantLine className="w-4 h-4" />
              {locale === "en" ? "Natural" : "طبيعي"}
            </span>
            <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              {locale === "en" ? "Premium" : "ممتاز"}
            </span>
          </div>

          <AddToCart product={productDetails} />

          {/* Additional UX Elements */}
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
            <p className="text-blue-800 text-sm">
              {locale === "en"
                ? "All our products are made with 100% natural ingredients"
                : "جميع منتجاتنا مصنوعة من مكونات طبيعية 100٪"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsCard;
