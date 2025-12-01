'use client'
import Image from "next/image";
import { useLocale } from "next-intl";
import { TSection } from "./sectionType";
import { motion } from "framer-motion";

interface ProductCardProps {
  imagesData: TSection;
}

const SectionImages = ({ imagesData }: ProductCardProps) => {
  const locale = useLocale();
  const { sectionImages,  titleEn, titleAr } = imagesData;

  const mainImage = sectionImages?.[0];

  return (
    <div className="relative order-1 lg:order-2 w-full sm:h-72 h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden animate-fadeIn">
      <Image
                      src={mainImage.url}

        alt={locale === "en" ? "Food delivery background" : "خلفية توصيل طعام"}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {mainImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-16 left-6 bg-white/80 dark:bg-gray-800/80 px-4 py-3 rounded-md shadow-md flex items-center gap-2"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
        src={sectionImages?.[2]?.url}
              alt={locale === "en" ? `${titleEn} image` : `${titleAr} صورة`}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-xs text-gray-800 dark:text-white">
              {titleEn}
            </span>
            <span className="text-xs text-gray-800 dark:text-white">
              ⭐  4.5
            </span>
          </div>
        </motion.div>
      )}

      <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Image
            src={sectionImages?.[1]?.url}
            alt={locale === "en" ? "Background secondary" : "الخلفية الثانوية"}
            fill
            className="object-contain"
          />
        </div>
        <span className="font-bold text-md text-gray-800 dark:text-white">
          {titleAr}
        </span>
      </div>
    </div>
  );
};

export default SectionImages;
