import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import MainSectionClient from "@/components/AdminActionUi/Sections/MainSection/MainSectionClient";
import MainSectionColumnType from "@/types/MainSectionType";

const MainSectionsPage = async () => {
  const currentUser = await getCurrentUser();
  const isManager =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "DEVELOPER";

  const mainSection = await prismadb.mainSection.findMany({
    include: {
      sectionImages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedMainSection: MainSectionColumnType[] = mainSection.map((item) => ({
    id: item.id,
    slug: item.slug,
    titleEn: item.titleEn,
    titleAr: item.titleAr,
    subtitleEn: item.subtitleEn,
    subtitleAr: item.subtitleAr,
    descEn: item.descEn,
    descAr: item.descAr,
    sectionImages: item.sectionImages,
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
            <MainSectionClient data={formattedMainSection} />
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

export default MainSectionsPage;
