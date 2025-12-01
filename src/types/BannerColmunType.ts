type BannerColumnType = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  
  bannerImages: {
    id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    bannerId: string;
  }[];
  bgOne?: string | null; // <-- FIXED
  bgTwo?: string | null; // If exist
  createdAt: string;
};

export default BannerColumnType;


