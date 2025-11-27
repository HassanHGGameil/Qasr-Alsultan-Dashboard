import Image from "next/image";
import { useLocale } from "next-intl";
import {
  FaFacebookF,
  FaInstagram,
  FaChevronRight,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import { ReactNode } from "react";
import markupLogo from "../../../../../public/icons/logo-mark.png";
import FooterLogo from "./FooterLogo";
import Link from "@/components/common/Link";

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
  address?: LocaleString;
  hours?: LocaleString;
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
    name: "Youtube",
    link: "https://www.facebook.com/profile.php?id=61574451836989",
    icon: <FaYoutube size={14} />,
    bgColor: "bg-[#1872F2]",
    animation: { rotate: 10, scale: 1.1 },
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61574451836989",
    icon: <FaFacebookF size={14} />,
    bgColor: "bg-[#1872F2]",
    animation: { rotate: 10, scale: 1.1 },
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/teteproducts",
    icon: <FaInstagram size={14} />,
    bgColor: "bg-gradient-to-tr from-[#833AB4] via-[#C13584] to-[#E1306C]",
    animation: { rotate: -10, scale: 1.1 },
  },

  {
    name: "Tiktok",
    link: "https://www.tiktok.com/@tete.eg",
    icon: <FaTiktok size={14} />,
    bgColor: "bg-[#222]",
    animation: { rotate: 15, scale: 1.1 },
  },

  {
    name: "Whatsup",
    link: "`https://wa.me/+201070902710",
    icon: <FaWhatsapp size={14} />,
    bgColor: "bg-[#222]",
    animation: { rotate: 15, scale: 1.1 },
  },
];

const FOOTER_CONTENT: FooterContent = {
  description: {
    en: `Mansour Group for Sweets and Integrated Food Industries, 50 years of leadership, quality and integration.`,
    ar: `مجموعة المنصور للحلويات والصناعات الغذائية المتكاملة، 50 عاما من الريادة والجودة والتكامل`,
  },
  links: [
    { en: "Home", ar: "الرئسيه", href: "#" },
    { en: "About", ar: "من نحن", href: "/about" },
    { en: "Products", ar: "المنتجات", href: "/products" },
    { en: "Contact", ar: "اتصل بنا", href: "/contact" },
  ],

  specialties: [
    {
      en: "Internal Medicine",
      ar: "الطب الباطني",
      href: "/specialties/internal",
    },
    {
      en: "Preventive Care",
      ar: "الرعاية الوقائية",
      href: "/specialties/preventive",
    },
    {
      en: "Chronic Disease",
      ar: "الأمراض المزمنة",
      href: "/specialties/chronic",
    },
    {
      en: "Health Screening",
      ar: "الفحص الصحي",
      href: "/specialties/screening",
    },
  ],

  contact: {
    email: "info@mansoursweet.com",
    phone: "+20502770996",
  },
};

// Components
const FooterLink = ({
  item,
  locale,
  color = "blue-500",
}: {
  item: FooterLinkItem;
  locale: "en" | "ar";
  color?: string;
}) => {
  return (
    <div>
      <Link
        href={item.href}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 group text-base font-medium"
      >
        <div
          className={`mr-3 rtl:mr-0 rtl:ml-3 text-${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          <FaChevronRight size={10} className="rtl:rotate-180" />
        </div>
        {item[locale]}
      </Link>
    </div>
  );
};

const ContactItem = ({ label, value, href, additional }: ContactItemProps) => (
  <div className="flex items-start">
    <div>
      <p className="text-xs text-gray-500 dark:text-blue-200 uppercase tracking-wider">
        {label}
      </p>
      {href ? (
        <Link
          href={href}
          className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 font-medium text-base"
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
  </div>
);

const Footer = () => {
  const locale = useLocale() as "en" | "ar";
  const currentYear = new Date().getFullYear();

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative z-10  rounded-t-3xl shadow-lg bg-white dark:bg-red-900/10 border-t border-gray-100 dark:border-red-800/50"
    >
      <div className="container  mx-auto relative">
        <div className="grid grid-cols-1 gap-14 py-2 lg:py-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-8 xl:col-span-2 flex flex-col items-center md:items-start">
            <FooterLogo />

            <div className="text-gray-600 dark:text-blue-100 leading-relaxed text-md max-w-md text-center lg:text-start md:text-left">
              {FOOTER_CONTENT.description[locale]}
            </div>

            <div className="flex space-x-3 rtl:space-x-reverse justify-center md:justify-start ">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-slate-700 dark:bg-blue-900/20 text-white hover:bg-orange-600 hover:text-white transition-all duration-300 ${social.bgColor} shadow-sm hover:shadow-md border border-gray-200 dark:border-blue-800/50`}
                >
                  <div>{social.icon}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <span className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-3 rtl:mr-0 rtl:ml-3"></span>
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
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <span className="w-2.5 h-2.5 bg-orange-300 rounded-full mr-3 rtl:mr-0 rtl:ml-3"></span>
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
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-red-800/50 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 dark:text-blue-200 text-sm">
            <Link
              href={"https://www.markup.vip"}
              target="_blnk"
              className="text-gray-500 dark:text-green-200 text-[12px]  lg:text-sm flex items-center "
            >
              <div className="bg-blue-900 w-8 h-8 rounded-full  flex items-center justify-center mx-2 shadow-md">
                <Image
                  src={markupLogo}
                  alt="Markup Agency"
                  className=" transition-all w-full duration-700 hover:rotate-6 hover:scale-105"
                  width={120}
                  height={120}
                  priority
                  loading="eager"
                />
              </div>
              &copy; {currentYear} MarkUP Agency{" "}
              {locale === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="text-gray-500 dark:text-blue-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 text-sm"
            >
              {locale === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 dark:text-blue-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 text-sm"
            >
              {locale === "en" ? "Terms of Service" : "شروط الخدمة"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
