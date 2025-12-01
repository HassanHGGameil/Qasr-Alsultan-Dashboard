


export type TSection = {
    id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  sectionImages: { url: string }[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgOne?: any | null; // <-- FIXED
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgTwo?: any | null; // If exist
};





export type THero = {
    id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  heroImages: { url: string }[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgOne?: any | null; // <-- FIXED
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgTwo?: any | null; // If exist
};
