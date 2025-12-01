"use client";
import { CiUser } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const ProfileMenu = () => {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const locale = useLocale()

  const role = session?.user?.role;


  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close popup when pressing Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPopupVisible(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" dir={locale === "ar" ? "rtl" : "ltr"}>
  {status === "authenticated" ? (
    <>
      {/* Avatar Button */}
      <button
        onClick={() => setIsPopupVisible((p) => !p)}
        className="group h-11 w-11 rounded-full overflow-hidden 
        border border-gray-300 dark:border-gray-600 
        shadow-sm hover:shadow-md transition-all"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            width={44}
            height={44}
            alt="User Avatar"
            className="object-cover rounded-full group-hover:scale-105 transition-all"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full 
          bg-primary text-white text-lg font-semibold">
            {session?.user?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isPopupVisible && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.93, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: -5 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute top-14 z-50 w-64 
              bg-white/95 dark:bg-gray-900/95
              backdrop-blur-xl 
              border border-gray-200/60 dark:border-gray-700/60
              shadow-2xl rounded-2xl p-4
              ${locale === "ar" ? "left-0" : "right-0"}`}
          >
            {/* User Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-300/50 dark:border-gray-700/50">
              {/* Avatar Small */}
              <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-primary text-white font-semibold">
                    {session?.user?.name?.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name & Email */}
              <div className="flex flex-col">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            {/* Menu */}
            <div className="mt-3 space-y-2">
              {role === "USER" ? (
                    <button
                      onClick={() => {
                        setIsPopupVisible(false);
                        router.push(`/`);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      text-gray-700 dark:text-gray-300 transition"
                    >
                      {locale === "ar" ? `اهلا بيك : -  ${session?.user?.name}` : `Welcome:- ${session?.user?.name}`}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsPopupVisible(false);
                        router.push(`/dashboard`);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      text-gray-700 dark:text-gray-300 transition"
                    >
                    </button>
                  )}

              <button
                onClick={() => signOut()}
                className="w-full text-center px-3 py-2 text-sm rounded-lg
                bg-red-500 hover:bg-red-600 text-white transition"
              >
                {locale === "ar" ? "تسجيل الخروج" : "Sign Out"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ) : (
    <Link
      href={`/auth/sign-in`}
      className="hidden lg:flex items-center bg-red-800 dark:bg-gray-900 
      rounded-full p-2 hover:bg-red-900 dark:hover:bg-gray-700 
      shadow-sm transition"
    >
      <CiUser className="text-[26px] text-white dark:text-gray-100" />
    </Link>
  )}
</div>

  );
};

export default ProfileMenu;
