import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

import BannerClient from "@/components/AdminActionUi/Sections/Banner/BannerClient";
import BannerColumnType from "@/types/BannerColmunType";

const BannersPage = async () => {
  const currentUser = await getCurrentUser();
  const isManager =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "DEVELOPER";

  const heroSection = await prismadb.banner.findMany({
    include: {
      bannerImages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedHero: BannerColumnType[] = heroSection.map((item) => ({
    id: item.id,
    slug: item.slug,
    titleEn: item.titleEn,
    titleAr: item.titleAr,
    subtitleEn: item.subtitleEn,
    subtitleAr: item.subtitleAr,
    bannerImages: item.bannerImages,
    bgOne: item.bgOne,
    bgTwo: item.bgTwo,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      {isManager ? (
        <div className="flex-col w-full">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <BannerClient data={formattedHero} />
          </div>
        </div>
      ) : (
        <div className="px-8 text-blue-500 py-5">
          You Are Not A Manger To Showing Data
        </div>
      )}
    </>
  );
};

export default BannersPage;
