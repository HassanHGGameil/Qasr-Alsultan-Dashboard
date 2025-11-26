type HeroColumnType = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  heroImages: {
    id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    heroId: string;
  }[];
  bgOne?: string | null; // <-- FIXED
  bgTwo?: string | null; // If exist
  createdAt: string;
};

export default HeroColumnType;
