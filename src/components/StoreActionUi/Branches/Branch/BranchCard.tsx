"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { TBranches } from "./branchType";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";

interface BranchCardProps {
  brancheData: TBranches;
}

const BranchCard = ({ brancheData }: BranchCardProps) => {
  const {
    id,
    imageUrl,
    nameEn,
    nameAr,
    titleEn,
    titleAr,
    dateEn,
    dateAr,
    locationLink,
    phone,
  } = brancheData;

  const router = useRouter()
  const locale = useLocale();
  const name = locale === "en" ? nameEn : nameAr;
  const title = locale === "en" ? titleEn : titleAr;
  const date = locale === "en" ? dateEn : dateAr;

  return (
    <Card
      key={id}
      className="rounded-3xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        border border-[#FFC50F30] bg-white dark:bg-gray-900"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Image */}
      <div className="relative w-full h-56 group overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="100vw"
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />

        
        {/* Name Overlay */}
        <h3 className="absolute bottom-4 left-5 right-5 text-white text-xl font-semibold drop-shadow-md">
          {name}
        </h3>
      </div>

      <CardContent className="p-6">
        <p className="text-sm font-semibold text-[#A72703] mb-4 tracking-wide dark:text-[#FFC50F]">
          {locale === "ar" ? nameEn : nameAr}
        </p>

        <div className="space-y-5">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#FFC50F20] border border-[#FFC50F40] dark:bg-[#A72703]/20 dark:border-[#A72703]/40">
              <MapPin className="w-5 h-5 text-[#A72703] dark:text-[#FFC50F]" />
            </div>
            <div>
              <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg">{title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {locale === "ar" ? titleEn : titleAr}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FFC50F20] border border-[#FFC50F40] dark:bg-[#A72703]/20 dark:border-[#A72703]/40">
              <Phone className="w-5 h-5 text-[#A72703] dark:text-[#FFC50F]" />
            </div>
            <a
              href={`tel:${phone}`}
              className="text-lg text-gray-900 dark:text-gray-100 font-medium hover:text-[#A72703] dark:hover:text-[#FFC50F] transition"
            >
              {phone}
            </a>
          </div>

          {/* Working Hours */}
          {date && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#FFC50F20] border border-[#FFC50F40] dark:bg-[#A72703]/20 dark:border-[#A72703]/40">
                <Clock className="w-5 h-5 text-[#A72703] dark:text-[#FFC50F]" />
              </div>
              <p className="text-gray-900 dark:text-gray-100">{date}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          {/* Directions Button */}
          <Button
            className="flex-1 py-5 rounded-full bg-[#A72703] hover:bg-[#8f2103] 
              text-white shadow-md hover:shadow-lg transition-all font-semibold"
            onClick={() => router.push(`${locationLink}`)}
          >
            <Navigation className="w-4 h-4 mr-2" />
            {locale === "ar" ? "الاتجاهات" : "Directions"}
          </Button>

          {/* Call Button */}
          <Button
            variant="outline"
            className="flex-1 py-5 rounded-full border-2 border-[#FFC50F] 
              hover:bg-[#FFC50F] hover:text-black transition-all font-semibold shadow-sm"
            onClick={() => (window.location.href = `tel:${phone}`)}
          >
            <Phone className="w-4 h-4 mr-2" />
            {locale === "ar" ? "اتصل الآن" : "Call"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BranchCard;
