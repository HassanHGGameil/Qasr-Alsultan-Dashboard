"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ContentProps {
  titleEn: string;
  titleAr: string;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  imageUrl: string;

  onCtaClick?: () => void;
}

const DetailsContent: React.FC<ContentProps> = ({
  titleEn,
  titleAr,
  nameAr,
  nameEn,
  imageUrl,
  subtitleEn,
  subtitleAr,
  onCtaClick,
}) => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const isEnglish = locale === "en";
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`relative h-[50vh] min-h-[300px] w-full overflow-hidden rounded-2xl mx-auto max-w-[1800px] shadow-2xl group ${
        isRTL ? "rtl" : ""
      }`}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 ease-in-out group-hover:scale-105">
        <Image
          src={imageUrl}
          alt={isEnglish ? titleEn : titleAr}
          fill
          priority
          loading="eager"
          quality={100}
          className={`object-cover object-center transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoadingComplete={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/50 to-white/30 dark:inset-0 dark:bg-black/40 dark:bg-gradient-to-t dark:from-black/60 dark:to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-12 sm:px-12 sm:pb-16 md:px-16 md:pb-20 lg:px-20 lg:pb-24">
        {/* Category Tag */}

        {/* Title */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-4 leading-tight ${
            isRTL ? "text-right" : "text-left"
          } ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-500 ease-out delay-200`}
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          {isEnglish ? titleEn : titleAr}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-100  max-w-2xl ${
            isRTL ? "text-right" : "text-left"
          } mb-8 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-500 ease-out delay-300`}
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          {isEnglish ? subtitleEn : subtitleAr}
        </p>

        {/* CTA Button */}
        <button
          onClick={onCtaClick}
          className={`w-fit px-8 py-3 text-lg font-semibold text-white bg-slate-800/80 hover:bg-primary-700 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 ${
            isRTL ? "mr-auto" : "ml-auto"
          } ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-500 ease-out delay-400`}
        >
          {isEnglish ? nameEn : nameAr}
        </button>
      </div>

      {/* Scrolling Indicator (for pages with content below) */}
      <div
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 ${
          loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 delay-700`}
      >
        <div className="animate-bounce w-6 h-6 border-4 border-white rounded-full"></div>
      </div>
    </div>
  );
};

export default DetailsContent;
