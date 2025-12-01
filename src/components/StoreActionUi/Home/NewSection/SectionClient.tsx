import HeroActionButton from "./SectionActionButton";
import SectionContent from "./SectionContent";
import getMainSection from "@/lib/Actions/FrontendAction/getHomeSection";
import SectionImages from "./SectionImages";
import SectionBanner from "./SectionBanner";

const HomeSectionClient = async () => {
  const mainSection = await getMainSection()
  const sectionData = mainSection.find((h) => h.id === "692be03e152fe9fedb14152a");

  if (!sectionData) return null; // handle missing hero

  return (
    <div className="relative w-full ">
      <SectionBanner bgImages={sectionData}  />

      <div className="container relative z-10 py-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-start">
            <SectionContent sectionContent={sectionData} />
            <HeroActionButton />
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2 w-full h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden">
            <SectionImages imagesData={sectionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSectionClient;
