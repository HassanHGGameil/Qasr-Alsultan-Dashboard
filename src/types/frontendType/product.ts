type TProduct = {
  id: string;
  slugEn: string;
  slugAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  offer: number;
  position: number;
  offerPrice: number;
  quantity: number;
  categoriesId: string;
  productItems: IProductItem;
  productAddtions: IProductAddions;
  images: { url: string }[];
  isBestSeller: boolean;
  isFeatured: boolean;
  isArchived: boolean;
};
export default TProduct;

export interface IProductAddions {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  price: number;
  category: string;
  sizeId: string;
  colorId: string;
  productItem: IProductItem; // Array of package items (max 10 items)
  imageUrl: string;
}

export interface IProductItem {
  id: string;
  nameEn: string; // English name of the package item
  nameAr: string; // Arabic name of the package item
  price?: number; // Arabic name of the package item
  quantity?: number; // Arabic name of the package item
  imageUrl: string; // URL of the package item image
  productCategoryId: string;
}
