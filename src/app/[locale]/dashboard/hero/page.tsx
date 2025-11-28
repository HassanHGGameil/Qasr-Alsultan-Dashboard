import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import HeroColumnType from "@/types/HeroColumnType";
import HeroClient from "@/components/AdminActionUi/HeroSection/HeroClient/HeroClient";

const HeroSectionPage = async () => {
  const currentUser = await getCurrentUser();

  const isMangement =
    currentUser &&
    ["OWNER", "MANAGER", "ADMIN", "AdminOne"].includes(currentUser.role);

  if (!isMangement) {
    return (
      <div className="px-8 text-blue-500 py-5">
        You are not authorized to view this data.
      </div>
    );
  }

  const heroSection = await prismadb.hero.findMany({
    include: {
      heroImages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedHero: HeroColumnType[] = heroSection.map((item) => ({
    id: item.id,
    slug: item.slug,
    titleEn: item.titleEn,
    titleAr: item.titleAr,
    subtitleEn: item.subtitleEn,
    subtitleAr: item.subtitleAr,
    descEn: item.descEn,
    descAr: item.descAr,
    heroImages: item.heroImages,
    bgOne: item.bgOne,
    bgTwo: item.bgTwo,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HeroClient data={formatedHero.reverse()} />
      </div>
    </div>
  );
};

export default HeroSectionPage;
