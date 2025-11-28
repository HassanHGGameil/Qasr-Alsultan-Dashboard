"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import myImage from "../../../../../public/images/mo-bg.jpeg";
import { useLocale } from "next-intl";
import { FaChartLine, FaUsers, FaBuilding, FaHandshake, FaLightbulb, FaRocket } from "react-icons/fa";
import { FiAward } from "react-icons/fi";
import Link from "@/components/common/Link";
import { useMediaQuery } from "react-responsive";

export default function About() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  const stats = [
    { 
      id: 1, 
      value: "15+", 
      labelEn: "Years Experience", 
      labelAr: "سنوات خبرة", 
      icon: <FaChartLine className="text-blue-500" size={20} />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    { 
      id: 2, 
      value: "200+", 
      labelEn: "Campaigns Managed", 
      labelAr: "حملة تسويقية", 
      icon: <FaUsers className="text-purple-500" size={20} />,
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    { 
      id: 3, 
      value: "MarkUP", 
      labelEn: "Marketing Agency", 
      labelAr: "وكالة تسويقية", 
      icon: <FaBuilding className="text-green-500" size={20} />,
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    { 
      id: 4, 
      value: "12", 
      labelEn: "Industry Awards", 
      labelAr: "جائزة صناعية", 
      icon: <FiAward className="text-yellow-500" size={20} />,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
  ];

  const achievements = [
    {
      icon: <FaRocket className="text-blue-500" />,
      textEn: "300% increase in client conversion rates within 12 months",
      textAr: "زيادة معدل التحويل للعملاء بنسبة 300% في 12 شهراً"
    },
    {
      icon: <FaHandshake className="text-purple-500" />,
      textEn: "Specialized team across 8 marketing disciplines",
      textAr: "فريق متخصص في 8 مجالات تسويقية مختلفة"
    },
    {
      icon: <FaLightbulb className="text-yellow-500" />,
      textEn: "Partnerships with global brands across 3 continents",
      textAr: "شركاء مع علامات تجارية عالمية في 3 قارات"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: isSmallScreen ? 0 : (isArabic ? 60 : -60),
      y: isSmallScreen ? 40 : 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: isSmallScreen ? 0 : (isArabic ? -60 : 60),
      y: isSmallScreen ? 40 : 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.9,
        delay: isSmallScreen ? 0.15 : 0,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section
      id="about"
      className={`py-20 md:py-32 relative bg-white dark:bg-gray-900 overflow-hidden ${isArabic ? "rtl" : "ltr"}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-100/20 dark:bg-purple-900/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          className="flex flex-col items-center mb-16 md:mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-center"
          >
            {isArabic ? "الدكتور محمد شريف" : "Dr. Mohamed Sherif"}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl text-center leading-relaxed"
          >
            {isArabic ? "خبير في التسويق الرقمي والاستراتيجي" : "Expert in Digital and Strategic Marketing"}
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={imageVariants}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            className="relative mx-auto order-first"
          >
            <div className="w-[280px] h-[280px] md:w-[360px] md:h-[460px] relative rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group">
              <Image
                src={myImage}
                alt={isArabic ? "الدكتور محمد شريف" : "Dr. Mohamed Sherif"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 360px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 w-[280px] h-[280px] md:w-[360px] md:h-[460px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl -z-10"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={contentVariants}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            className={`flex flex-col ${isArabic ? "text-right" : "text-left"}`}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {isArabic 
                  ? "مدير وكالة مارك أب | خبير تسويق دولي" 
                  : "Manager of MarkUP Agency | International Marketing Expert"}
              </h3>
              <div className={`h-1 bg-gradient-to-r from-blue-400 to-purple-500 mb-6 ${isArabic ? "ml-auto" : "mr-auto"}`} style={{ width: '80px' }}></div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
              {isArabic
                ? "بصفته مدير وكالة مارك أب الرائدة، يقود الدكتور محمد شريف فريقاً من الخبراء في تقديم حلول تسويقية متكاملة تحقق نتائج ملموسة للعملاء في مختلف القطاعات."
                : "As Manager of leading MarkUP Agency, Dr. Sherif heads a team of experts delivering integrated marketing solutions that drive measurable results for clients across industries."}
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
              {isArabic
                ? "جمع بين الخبرة الأكاديمية (دكتوراه في التسويق الاستراتيجي) والإدارة التنفيذية لوكالة تسويقية ناجحة، مما يمكنه من تقديم رؤى فريدة تجمع بين النظرية والتطبيق العملي."
                : "Combining academic credentials (PhD in Strategic Marketing) with executive management of a successful marketing agency, enabling him to deliver unique insights bridging theory and practice."}
            </motion.p>

            {/* Agency Highlights */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10 shadow-sm"
            >
              <h4 className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                <FaRocket className="text-blue-500" />
                {isArabic ? "إنجازات وكالة مارك أب" : "MarkUP Agency Achievements"}
              </h4>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: false }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0">
                      {achievement.icon}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {isArabic ? achievement.textAr : achievement.textEn}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-2 gap-4 w-full mb-10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  variants={statItemVariants}
                  custom={i}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className={`${stat.bgColor} border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all`}
                >
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {isArabic ? stat.labelAr : stat.labelEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-2"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={isArabic ? "https://www.markup.vip/ar" : "https://www.markup.vip"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  {isArabic ? "تواصل مع MarkUP" : "Contact MarkUP"}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity -z-10"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/${locale}/contact`}
                  className="px-8 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  {isArabic ? "تواصل مباشر" : "Direct Contact"}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}