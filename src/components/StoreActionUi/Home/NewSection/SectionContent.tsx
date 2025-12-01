import { useLocale } from "next-intl";
import React from "react";
import { TSection } from "./sectionType";

interface SectionCardProps {
  sectionContent: TSection;
}

const SectionContent = ({ sectionContent }: SectionCardProps) => {
  const { titleEn, titleAr, subtitleEn, subtitleAr, descEn, descAr } =
    sectionContent;

  const locale = useLocale();

  return (
    <div className="order-1 lg:order-1 text-center lg:text-start">
      <p className="text-lg text-red-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
        {locale === "en" ? titleEn : titleAr}
      </p>
      <h1 className="text-4xl  font-bold text-gray-900 dark:text-white mb-4">
        {locale === "en" ? subtitleEn : subtitleAr}
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
        {locale === "en" ? descEn : descAr}
      </p>
    </div>
  );
};

export default SectionContent;
