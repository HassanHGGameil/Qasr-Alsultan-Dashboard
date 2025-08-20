"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
 
  FaChevronRight,
  FaTiktok,
} from "react-icons/fa";
import { ReactNode } from "react";

// Static assets
import darklogo from "../../../../public/icons/qasr-alsutan-logo.png";
import lightlogo from "../../../../public/icons/qasr-alsutan-logo.png";

type LocaleString = {
  en: string;
  ar: string;
};

type FooterLinkItem = {
  en: string;
  ar: string;
  href: string;
};

type ContactInfo = {
  email: string;
  phone: string;
  address: LocaleString;
  hours: LocaleString;
};

type SocialLink = {
  name: string;
  link: string;
  icon: ReactNode;
  bgColor: string;
  animation: {
    rotate: number;
    scale: number;
  };
};

type FooterContent = {
  description: LocaleString;
  links: FooterLinkItem[];
  specialties: FooterLinkItem[];
  contact: ContactInfo;
};

type ContactItemProps = {
  label: string;
  value: string;
  href?: string;
  additional?: string;
};
// Content
const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/DrMohamedSherifOfficial",
    icon: <FaFacebookF size={14} />,
    bgColor: "bg-[#1872F2]",
    animation: { rotate: 10, scale: 1.1 },
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/drmohamedsherif",
    icon: <FaInstagram size={14} />,
    bgColor: "bg-gradient-to-tr from-[#833AB4] via-[#C13584] to-[#E1306C]",
    animation: { rotate: -10, scale: 1.1 },
  },

  {
    name: "Tiktok",
    link: "https://www.facebook.com/DrMohamedSherifOfficial",
    icon: <FaTiktok size={14} />,
    bgColor: "bg-[#222]",
    animation: { rotate: 15, scale: 1.1 },
  },
];

const FOOTER_CONTENT: FooterContent = {
  description: {
    en: "Join 10,000+ Professionals Who Transformed Their SkillsBecome Part of Dr. Mohamed Sherif's Exclusive Learning Community",
    ar: "انضم إلى أكثر من 10,000 محترف طوروا مهاراتهم,كن جزءًا من مجتمع د. محمد شريف التعليمي الحصري",
  },
  links: [
    { en: "Home", ar: "الرئسيه", href: "#" },
    { en: "Courses", ar: "ألكورسات", href: "#courses" },
    { en: "About", ar: "عن د.محمد شريف", href: "#about" },
   
  ],
  specialties: [
    { en: "Internal Medicine", ar: "الطب الباطني", href: "/specialties/internal" },
    { en: "Preventive Care", ar: "الرعاية الوقائية", href: "/specialties/preventive" },
    { en: "Chronic Disease", ar: "الأمراض المزمنة", href: "/specialties/chronic" },
    { en: "Health Screening", ar: "الفحص الصحي", href: "/specialties/screening" },
  ],
  contact: {
    email: "info@drmohamedsherif.com",
    phone: "+20 123 456 7890",
    address: {
      en: "123 Medical Center, Cairo, Egypt",
      ar: "123 المركز الطبي، القاهرة، مصر"
    },
    hours: {
      en: "Sat-Thu: 9AM - 5PM | Fri: Closed",
      ar: "السبت-الخميس: 9 صباحاً - 5 مساءً | الجمعة: مغلق"
    },
  },
};

// Components
const FooterLink = ({ item, locale, color = "blue-500" }: { item: FooterLinkItem, locale: 'en' | 'ar', color?: string }) => {
  const linkHover = {
    hover: {
      x: locale === "ar" ? -6 : 6,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.li whileHover="hover">
      <Link
        href={item.href}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group text-base font-medium"
      >
        <motion.span
          className={`mr-3 rtl:mr-0 rtl:ml-3 text-${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          variants={linkHover}
        >
          <FaChevronRight size={10} className="rtl:rotate-180" />
        </motion.span>
        {item[locale]}
      </Link>
    </motion.li>
  );
};

const ContactItem = ({  label, value, href, additional }: ContactItemProps) => (
  <motion.li className="flex items-start" >
    
    <div>
      <p className="text-xs text-gray-500 dark:text-blue-200 uppercase tracking-wider">
        {label}
      </p>
      {href ? (
        <Link
          href={href}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium text-base"
        >
          {value}
        </Link>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 font-medium text-base">
          {value}
        </p>
      )}
      {additional && (
        <p className="text-xs text-gray-500 dark:text-blue-200 mt-1.5">
          {additional}
        </p>
      )}
    </div>
  </motion.li>
);

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const locale = useLocale() as 'en' | 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative z-10 rounded-t-3xl shadow-lg bg-white dark:bg-blue-900/10 border-t border-gray-100 dark:border-blue-800/50"
    >
      <div className="container  mx-auto relative">
        <motion.div
          className="grid grid-cols-1 gap-14 py-2 lg:py-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
        >
          {/* Brand Column */}
          <motion.div
            className="space-y-8 xl:col-span-2 flex flex-col items-center md:items-start"
          >
            <Link
              href="/"
              className="inline-block"
              aria-label="Dr. Mohamed Sherif Clinic"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={resolvedTheme}
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 5 }}
                  transition={{ duration: 0.4 }}
                  className="w-28 h-28 bg-white dark:bg-blue-900/20 rounded-2xl p-2 shadow-xl dark:shadow-blue-900/30 flex items-center justify-center border border-gray-200 dark:border-blue-800/50 mx-auto md:mx-0"
                  whileHover={{
                    y: -5,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <Image
                    src={resolvedTheme === "dark" ? lightlogo : darklogo}
                    alt="Dr. Mohamed Sherif Logo"
                    className="w-full transition-all duration-700 hover:rotate-6 hover:scale-105"
                    width={112}
                    height={112}
                    priority
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>
            </Link>

            <motion.p
              className="text-gray-600 dark:text-blue-100 leading-relaxed text-md max-w-md text-center lg:text-start md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              {FOOTER_CONTENT.description[locale]}
            </motion.p>

            <motion.div
              className="flex space-x-3 rtl:space-x-reverse justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-slate-700 dark:bg-blue-900/20 text-white hover:text-white transition-all duration-300 ${social.bgColor} shadow-sm hover:shadow-md border border-gray-200 dark:border-blue-800/50`}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div whileHover={social.animation}>
                    {social.icon}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div  className="space-y-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3 rtl:mr-0 rtl:ml-3"></span>
              {locale === "en" ? "Quick Links" : "روابط سريعة"}
            </h3>
            <ul className="space-y-4">
              {FOOTER_CONTENT.links.map((link) => (
                <FooterLink
                  key={link.href}
                  item={link}
                  locale={locale}
                  color="blue-500"
                />
              ))}
            </ul>
          </motion.div>

          {/* Specialties */}
          {/* <motion.div className="space-y-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <span className="w-2.5 h-2.5 bg-blue-400 rounded-full mr-3 rtl:mr-0 rtl:ml-3"></span>
              {locale === "en" ? "Specialties" : "التخصصات"}
            </h3>
            <ul className="space-y-4">
              {FOOTER_CONTENT.specialties.map((specialty) => (
                <FooterLink
                  key={specialty.en}
                  item={specialty}
                  locale={locale}
                  color="blue-400"
                />
              ))}
            </ul>
          </motion.div> */}

          {/* Contact Info */}
          <motion.div className="space-y-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <span className="w-2.5 h-2.5 bg-blue-300 rounded-full mr-3 rtl:mr-0 rtl:ml-3"></span>
              {locale === "en" ? "Contact Us" : "اتصل بنا"}
            </h3>
            <ul className="space-y-5">
              <ContactItem
                label={locale === "en" ? "Email" : "البريد الإلكتروني"}
                value={FOOTER_CONTENT.contact.email}
                href={`mailto:${FOOTER_CONTENT.contact.email}`}
              />
              <ContactItem
                label={locale === "en" ? "Phone" : "الهاتف"}
                value={FOOTER_CONTENT.contact.phone}
                href={`tel:${FOOTER_CONTENT.contact.phone.replace(/\D/g, "")}`}
              />
              
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-gray-200 dark:border-blue-800/50 py-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-gray-500 dark:text-blue-200 text-sm">
            &copy; {currentYear} Dr. Mohamed Sherif {locale === "en" ? "| All rights reserved" : "| جميع الحقوق محفوظة"}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="text-gray-500 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
            >
              {locale === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
            >
              {locale === "en" ? "Terms of Service" : "شروط الخدمة"}
            </Link>
            <Link
              href="/medical-ethics"
              className="text-gray-500 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
            >
              {locale === "en" ? "Medical Ethics" : "أخلاقيات الطب"}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;