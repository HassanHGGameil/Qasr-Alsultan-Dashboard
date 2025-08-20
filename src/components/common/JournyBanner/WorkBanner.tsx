'use client'
import { useLocale } from 'next-intl';
import React from 'react';
import { 
  FaLeaf, 
  FaIndustry, 
  FaTruck, 
  FaShoppingBasket 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface WorkStep {
  id: string;
  titleEn: string;
  titleAr: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  descriptionEn: string;
  descriptionAr: string;
}

const WorkJourneyData: WorkStep[] = [
  {
    id: crypto.randomUUID(),
    titleEn: "Premium Sourcing",
    titleAr: "المصادر الممتازة",
    descriptionEn: "We select only the finest natural ingredients from trusted suppliers",
    descriptionAr: "نختار فقط أفضل المكونات الطبيعية من موردين موثوق بهم",
    Icon: FaLeaf,
    color: "text-green-500"
  },
  {
    id: crypto.randomUUID(),
    titleEn: "Precision Production",
    titleAr: "الإنتاج الدقيق",
    descriptionEn: "Our state-of-the-art facilities ensure perfect consistency and quality",
    descriptionAr: "تضمن منشآتنا الحديثة اتساقًا وجودة مثالية",
    Icon: FaIndustry,
    color: "text-blue-500"
  },
  {
    id: crypto.randomUUID(),
    titleEn: "Reliable Distribution",
    titleAr: "التوزيع الموثوق",
    descriptionEn: "Temperature-controlled logistics for fresh delivery nationwide",
    descriptionAr: "خدمات لوجستية ذات تحكم في درجة الحرارة لتوصيل طازج في جميع أنحاء البلاد",
    Icon: FaTruck,
    color: "text-orange-500"
  },
  {
    id: crypto.randomUUID(),
    titleEn: "Enjoyment Guaranteed",
    titleAr: "متعة مضمونة",
    descriptionEn: "Experience the Mansour Sweet difference in every bite",
    descriptionAr: "جرب فرق منصور الحلو في كل قضمة",
    Icon: FaShoppingBasket,
    color: "text-purple-500"
  },
];

const WorkBanner = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isArabic ? "رحلة عملنا" : "Our Work Journey"}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WorkJourneyData.map((step, index) => (
            <motion.div
              key={step.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className={`relative mb-4 ${step.color}`}>
                  <div className={`absolute -z-10 w-24 h-24 rounded-full opacity-10 ${step.color.replace('text', 'bg')} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
                  <step.Icon className="w-10 h-10" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm lg:text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {isArabic ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-sm hidden lg:block text-gray-600 dark:text-gray-300">
                    {isArabic ? step.descriptionAr : step.descriptionEn}
                  </p>
                </div>
                
                <div className={`mt-2 text-xs font-medium ${step.color}`}>
                  {isArabic ? `خطوة ${index + 1}` : `Step ${index + 1}`}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WorkBanner;