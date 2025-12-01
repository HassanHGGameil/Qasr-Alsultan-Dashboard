type MainSectionColumnType = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  sectionImages: {
    id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    mainSectionId: string;
  }[];
  
  bgOne?: string | null; // <-- FIXED
  bgTwo?: string | null; // If exist
  createdAt: string;
};

export default MainSectionColumnType;
