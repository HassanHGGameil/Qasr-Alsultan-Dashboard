type ProductColumnType = {
  id: string;
  slugEn: string;
  slugAr?: string;
  nameEn?: string;
  nameAr?: string;
  titleEn?: string;
  titleAr?: string;
  subtitleEn?: string;
  subtitleAr?: string;
  category?: string;
  images?: { url: string }[];
  isFeatured?: boolean;
  isArchived?: boolean;
  createdAt: string;
};

export default ProductColumnType;
