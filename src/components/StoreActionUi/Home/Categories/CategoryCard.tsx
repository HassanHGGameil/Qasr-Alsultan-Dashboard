"use client";
import { CategoryDto } from "@/types/frontendType/categoroies"; 
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  categoryItem: CategoryDto;
  selectedCategory: string | number | null;
  onSelect: (id: string | number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryItem,
  selectedCategory,
  onSelect,
}) => {
  const { id, nameEn, nameAr, imageUrl } = categoryItem;
  const locale = useLocale();
  const name = locale === "en" ? nameEn : nameAr;

  const isActive = selectedCategory === id;

  return (
    <div
      onClick={() => onSelect(id)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(id)}
      role="button"
      tabIndex={0}
      aria-label={`Select ${name} category`}
      className={`
        flex flex-col items-center gap-2 py-4 

        cursor-pointer select-none
        transition-all duration-250 ease-out

        ${isActive ? "scale-[1.05]" : "hover:scale-[1.04] active:scale-[0.97]"}

        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900
      `}
    >
      {/* Card Container */}
      <div
        className={`
          relative
          h-[85px] w-[85px] sm:h-[100px] sm:w-[100px]
          rounded-3xl overflow-hidden

          shadow-[0px_4px_10px_rgba(0,0,0,0.08)]
          bg-white dark:bg-gray-800

          transition-all duration-300

          /* Ring when selected */
          ${isActive ? "ring-2 ring-red-800" : ""}
        `}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="
            object-cover
            transition-transform duration-500 ease-out
            hover:scale-110
          "
          loading="lazy"
        />
      </div>

      {/* Text */}
      <span
        className={`
          text-xs sm:text-sm font-semibold tracking-wide text-center
          transition-colors duration-200

          ${isActive
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-800 dark:text-gray-200"}
        `}
      >
        {name}
      </span>

      {/* Active Indicator (tiny dot) */}
      {isActive && (
        <div className="w-2 h-2 rounded-full bg-primary-500" />
      )}
    </div>
  );
};

export default CategoryCard;
