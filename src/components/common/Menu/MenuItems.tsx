import { formatCurrency } from "@/lib/formatters";
import Image, { StaticImageData } from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";

interface menuProps {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  image: string | StaticImageData;
}

function MenuItems(item: menuProps) {
  const { image, name, basePrice, description } = item;

  return (
    <li className="group bg-white cursor-pointer shadow-sm hover:shadow-lg p-4 md:p-5 rounded-lg transition-all duration-300 flex flex-col gap-3 md:gap-4 border border-gray-100 hover:border-green-100 hover:scale-[1.02] active:scale-[0.98]">
      {/* Image with responsive sizing */}
      <div className="relative aspect-square w-full max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] mx-auto overflow-hidden rounded-lg">
        
        <Image
          src={image}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          alt={name}
          fill
          priority
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
        />
      </div>
      
      {/* Content area with responsive spacing */}
      <div className="flex-1 flex flex-col gap-1.5 md:gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-base sm:text-lg text-gray-800 line-clamp-1" title={name}>
            {name}
          </h3>
          <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
            {formatCurrency(basePrice)}
          </span>
        </div>
        
        {description && (
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 md:line-clamp-3" title={description}>
            {description}
          </p>
        )}
      </div>
      
      {/* Responsive button */}
      <AddToCartButton 
        item={item} 
      />
    </li>
  );
}

export default MenuItems;
