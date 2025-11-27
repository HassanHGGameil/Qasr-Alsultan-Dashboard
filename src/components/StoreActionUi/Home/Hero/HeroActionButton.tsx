import { useLocale } from "next-intl";
import React from "react";

const HeroActionButton = () => {
  const locale = useLocale();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      <button className="flex items-center justify-center gap-2 px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-full transition-colors shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900">
        <span>{locale === "en" ? "Order Now" : "اطلب الآن"}</span>
        {/* <ArrowRight className="w-5 h-5" /> */}
      </button>
      <button className="px-8 py-3 border-2 border-red-500 text-red-800 dark:text-yellow-400 font-semibold rounded-full transition-colors hover:bg-orange-50 dark:hover:bg-gray-700">
        {locale === "en" ? "Make A Booking" : "احجز في المطعم الان"}
      </button>
    </div>
  );
};

export default HeroActionButton;
