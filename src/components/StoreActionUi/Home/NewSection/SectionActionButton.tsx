'use client'
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import React from "react";

const SectionActionButton = () => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      {/* <button className="flex items-center justify-center gap-2 px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-full transition-colors shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900">
        <span>{locale === "en" ? "Order Now" : "اطلب أفضل القطع الآن"}</span>
      </button> */}
      <button
        onClick={() => router.push(`/butcher`)}
        className="px-8 py-3 border-2 border-red-500 text-red-800 dark:text-yellow-400 font-semibold rounded-full transition-colors hover:bg-orange-50 dark:hover:bg-gray-700"
      >
        {locale === "en"
          ? "Explore Our Butcher Selection"
          : "اكتشف تشكيلة الجزار"}
      </button>
    </div>
  );
};

export default SectionActionButton;
