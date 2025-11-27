import { ChefHat, ShoppingCart } from "lucide-react";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface SectionTitleProps {
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  width?: string;
  center?: boolean;
  mb?: string;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "top";
  underline?: boolean;
  gradientText?: boolean;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  animate?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionTitle = ({
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  width = "570px",
  center,
  mb = "mb-14",
  className = "",
  iconPosition = "left",
  headingLevel = "h2",
  animate = false,
  titleClassName = "",
}: SectionTitleProps) => {
  const language = useLocale();
  const isRTL = language === "ar";

  // Text content
  const title = isRTL ? titleAr : titleEn;
  const subtitle = isRTL ? subtitleAr : subtitleEn;

  // Layout classes
  const alignmentClass = center
    ? "mx-auto text-center"
    : isRTL
    ? "text-right"
    : "text-left";
  const flexDirection = iconPosition === "top" ? "flex-col" : "flex-row";

  // Text styling
  const titleSizeClass = "text-3xl sm:text-4xl md:text-[45px]";
  // const underlineClass = underline ? "pb-2 border-b-2 border-primary" : "";

  const animationClass = animate ? "animate-fade-in-up" : "";

  // Create the appropriate heading element
  const HeadingTag = headingLevel;

  return (
    <div
      className={`w-full ${alignmentClass} ${mb} ${className} ${animationClass}`}
      style={{ maxWidth: width }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`flex ${flexDirection} items-center ${
          center ? "justify-center" : ""
        }`}
      >
        <div className={``}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-700 to-slate-700 dark:from-blue-900/30 dark:to-indigo-900/30 px-4 py-2 rounded-full mb-4">
            <ChefHat className="h-5 w-5 mx-2 text-white dark:text-green-400" />
            <span className="text-sm font-medium text-white dark:text-green-400">
              {subtitle}
            </span>
            <ShoppingCart className="h-5 w-5 text-white dark:text-green-400" />
          </div>
          <HeadingTag
            className={`${titleSizeClass} font-bold !leading-tight text-slate-800 dark:text-white   ${titleClassName}`}
            data-testid="section-title"
          >
            {title}
          </HeadingTag>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
