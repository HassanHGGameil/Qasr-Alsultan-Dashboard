import HeroActionButton from "./SectionActionButton";
import SectionContent from "./SectionContent";
// import SectionImages from "./SectionImages";
import SectionBanner from "./SectionBanner";
import getHero from "@/lib/Actions/FrontendAction/getHeroSection";

const MenuSectionHeroClient = async () => {
  const mainSection = await getHero()
  const sectionData = mainSection.find((h) => h.id === "692c44c4152fe9fedb141540");

  if (!sectionData) return null; // handle missing hero

  return (
    <div className="relative w-full ">
      <SectionBanner bgImages={sectionData}  />

      <div className="container relative z-10 py-12 ">
        <div className="flex justify-center gap-8 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-start">
            <SectionContent sectionContent={sectionData} />
            <HeroActionButton />
          </div>

          {/* Image Section */}
          {/* <div className="relative order-1 lg:order-2 w-full h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden">
            <SectionImages imagesData={sectionData} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MenuSectionHeroClient;
