import React from "react";
import Image from "next/image";
import MansourLogo from "../../../../public/icons/qasr-alsutan-logo.png";
import { useLocale } from "next-intl";
import SignInForm from "./SignInForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { FaBurger } from "react-icons/fa6";

const SignIn = () => {
  const locale = useLocale();
  const router = useRouter()

  const title = locale === "ar" ? "تواصل معنا الان" : "Contact With Us Now";
  const description =
    locale === "ar"
      ? "نحن هنا لمساعدتك. لا تتردد في التواصل معنا لأي استفسارات أو ملاحظات."
      : "We're here to help. Feel free to reach out for any inquiries or feedback.";

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Content container */}
      <div className="container w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-8  ">
        {/* Contact Form - takes full width on mobile, then 2/3 on larger screens */}
        <div className="w-full">
          <SignInForm />
        </div>

        <div className="w-full order-1 bg-white/85 dark:bg-slate-800/85 rounded-xl shadow-md py-4  flex justify-center">
          <div className="max-w-md text-center">
            <div className="relative w-40 h-40 md:w-64 md:h-64 mx-auto mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-md opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
              <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center p-4 shadow-lg border-4 border-white dark:border-gray-700 overflow-hidden">
                <Image
                  src={MansourLogo}
                  alt="Mansour Sweet Bakery Logo"
                  width={256}
                  height={256}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            <div className="px-4 lg:px-0">
              <h1 className="text-xl lg:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {title}
              </h1>
              <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-8">
                {description}
              </p>
            </div>
            <Button  type="submit"
            className=""
            size="lg" 
            onClick={() => router.push(`/`)}

            
            
            >

              {locale === "en" ? "Take Your Order Now" : "تسوق الان"}
               <FaBurger  />
              
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
