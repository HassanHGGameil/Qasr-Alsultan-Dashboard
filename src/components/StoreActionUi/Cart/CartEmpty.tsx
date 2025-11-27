"use client";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";

type Locale = 'en' | 'ar'; // Explicitly define supported locales

interface Content {
  title: string;
  description: string;
  buttonText: string;
}

export default function EmptyCart() {
  const router = useRouter();
  const locale = useLocale() as Locale; // Cast to our Locale type

  const onNavigate = () => {
    router.push("/");
  };

  // Content based on locale with proper typing
  const content: Record<Locale, Content> = {
    en: {
      title: "Your cart is empty",
      description: "Start adding some products",
      buttonText: "Continue Shopping",
    },
    ar: {
      title: "سلة التسوق فارغة",
      description: "ابدأ بإضافة بعض المنتجات",
      buttonText: "مواصلة التسوق",
    }
  };

  const isRTL = locale === "ar";

  // Fallback to English if locale is not supported
  const currentContent = content[locale] || content.en;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 gap-6 text-center"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      </div>
      <div>
        <p className="text-lg font-medium">{currentContent.title}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {currentContent.description}
        </p>
      </div>
      <Button 
        variant="outline"
        onClick={onNavigate}
        className={`gap-1.5 ${locale === "en" ? "rotate-180" : ""}`}
      >
        {isRTL ? (
          <>
            {currentContent.buttonText}
            <ArrowLeft className={`w-4 h-4 transform  `} />
          </>
        ) : (
          <>
            <ArrowLeft className="w-4 h-4" />
            {currentContent.buttonText}
          </>
        )}
      </Button>
    </motion.div>
  );
}