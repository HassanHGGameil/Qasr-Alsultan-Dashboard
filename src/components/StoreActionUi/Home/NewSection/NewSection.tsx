"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import DialogPopUp from "@/components/common/Dialog-PopUp/PopUp";

import heroImage from "../../../../../public/products/b-1.png";
import heroImage1 from "../../../../../public/products/b-1.png";

const NewSection = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleOrderClick = () => {
    setIsOpen(true);
  };

  const title = locale === "en"
    ? "Qasr Alsultan Butcher – Premium Meats"
    : "قصر السلطان – اللحوم الفاخرة";

  const usersText = locale === "en"
    ? "1000+ Customers"
    : "+1000 عميل";

  const subtitle = locale === "en"
    ? "Qasr Alsultan Butcher – Premium Meats Experience"
    : "قصر السلطان – تجربة اللحوم الفاخرة";

  const description = locale === "en"
    ? "Discover the finest selection of premium meats, hand-picked and crafted for quality and taste. Perfect for your family feasts or special occasions."
    : "اكتشف أفضل تشكيلة من اللحوم الفاخرة، مختارة بعناية ومعدة لأعلى جودة وطعم. مثالية لمناسباتك العائلية والخاصة.";

  const badgeTitle = locale === "en" ? "Special Offer" : "عرض خاص";

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <DialogPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="container relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-start animate-fadeIn">
            <p className="text-lg text-red-600 dark:text-gray-300 mb-4 max-w-lg mx-auto lg:mx-0">
              {title}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {usersText}
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {subtitle}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              {description}
            </p>

            <button
              onClick={handleOrderClick}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900"
            >
              <span>{locale === "en" ? "Order Now" : "اطلب الآن"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2 w-full h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden animate-fadeIn">
            <Image
              src={heroImage}
              alt={locale === "en" ? "Food delivery" : "توصيل طعام"}
              fill
              priority
              placeholder="blur"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Bottom-left Badge */}
            <div className="absolute bottom-16 left-6 bg-white/80 dark:bg-gray-800/80 px-4 py-3 rounded-md shadow-md flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={heroImage1} alt="Meat" fill className="object-contain" />
              </div>
              <div>
                <span className="font-bold text-xs text-gray-800 dark:text-white">{badgeTitle}</span>
                <span className="text-xs text-gray-800 dark:text-white">⭐ 4.5</span>
              </div>
            </div>

            {/* Top-right Badge */}
            <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src={heroImage1} alt="Meat" fill className="object-contain" />
              </div>
              <span className="font-bold text-md text-gray-800 dark:text-white">{badgeTitle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-red-200 dark:bg-orange-900 opacity-20 blur-3xl animate-slowSpin"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-red-200 dark:bg-amber-800 opacity-20 blur-3xl animate-slowSpin"></div>
      </div>
    </div>
  );
};

export default NewSection;
