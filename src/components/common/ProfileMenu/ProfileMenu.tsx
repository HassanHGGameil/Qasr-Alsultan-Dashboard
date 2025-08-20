"use client";
import { CiUser } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouter } from "@/i18n/routing";

const ProfileMenu = () => {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
    <div className="relative">
      {status === "authenticated" ? (
        <>
          {/* Profile Icon & Dropdown */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsPopupVisible((prev) => !prev)}
          >
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                width={40}
                height={40}
                alt="Profile Image"
                className="rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-primary transition-all"
              />
            ) : (
              <div className="bg-green-600 text-white flex items-center justify-center rounded-full w-10 h-10 text-lg font-semibold">
                {session?.user?.name?.[0]}
              </div>
            )}
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isPopupVisible && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-lg right-0 top-14 p-4 min-w-[200px] z-40 border border-gray-200 dark:border-gray-700"
              >
                <div className="px-3 pb-2 text-gray-900 dark:text-gray-200">
                  <p className="font-bold">{session?.user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700 my-2"></div>

                <button
                  onClick={() => {
                    setIsPopupVisible(false);
                    router.push("/admin/products");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Create Post
                </button>

                <button
                  onClick={() => signOut()}
                  className="mt-2 block w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md transition-all"
                >
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="flex items-center">
          <Link
            href={"/sign-in"}
            className="hidden lg:block bg-white rounded-full p-1.5 hover:bg-slate-200 shadow-sm"
          >
            <CiUser className="text-[25px] dark:text-black" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
