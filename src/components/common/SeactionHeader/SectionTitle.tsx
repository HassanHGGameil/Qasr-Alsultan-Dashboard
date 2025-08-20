import { useLocale } from "next-intl";

const SectionTitle = ({
  titleEn,
  titleAr,
  paragraphEn,
  paragraphAr,
  width = "570px",
  center,
  mb = "mb-14", // Tailwind class for margin-bottom
}: {
  titleEn: string;
  titleAr: string;
  paragraphEn?: string;
  paragraphAr?: string;
  language?: "en" | "ar"; // Language option
  width?: string;
  center?: boolean;
  mb?: string; // Tailwind class for margin-bottom
}) => {

  const language = useLocale();

  // Conditional text based on language
  const title = language === "ar" ? titleAr : titleEn;
  const paragraph = language === "ar" ? paragraphAr : paragraphEn;
  
  // Conditional alignment based on language
  const textAlignClass = center ? "mx-auto text-center" : language === "ar" ? "text-right md:text-[35px]" : "text-left md:text-[45px]";

  return (
    <div
      className={`w-full ${textAlignClass} ${mb}`}
      style={{ maxWidth: width }}
    >
      <h2 className=" text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl ">
        {title}
      </h2>
      {paragraph && (
        <p className="text-base !leading-relaxed text-body-color md:text-lg">
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
