



//__________ Products DTOS ________________

export interface ProductDto {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;

  slug?: string;

  structureEn?: string;
  structureAr?: string;

  shelfLifeEn?: string;
  shelfLifeAr?: string;


  fillingEn?: string;
  fillingAr?: string;


  storageEn?: string;
  storageAr?: string;

  price: number;
  quantity: number;

  category: CategoryDto;

  images: { url: string }[];
  imageUrl: string;

  
  isFeatured: boolean;
  isArchived?: boolean;
  createdAt: string;

}



export interface ProductDetailsDto {
  nameEn: string;
  nameAr: string;
  

  slug?: string;

  structureEn?: string;
  structureAr?: string;
  imageOne?: string;

  shelfLifeEn?: string;
  shelfLifeAr?: string;
  imageTwo?: string;


  fillingEn?: string;
  fillingAr?: string;
  imageThree?: string;


  storageEn?: string;
  storageAr?: string;
  imageFour?: string;


  createdAt: string;

}


export interface IUpdateProductDto {
  titleEn?: string;
  titleAr?: string;
  subtitleEn?: string;
  subtitleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  price?: number;
  offer?: number;
  offerPrice?: number;
  categoryId?: number;
  sizeId?: number;
  colorId?: string;
  images?: { url: string }[];
  isFeatured?: boolean;
  isArchived?: boolean;
  createdAt?: string;
}



// __________ Categoroies __________

export interface CategoryDto {
  id: string;
  slug:          string;   
  nameEn: string;
  nameAr: string;

  titleEn: string;
  titleAr: string;

  subtitleEn: string;
  subtitleAr: string;


  price: number;
  quantity: number;

  categoryId: string;
  productDetailsId: string;

  imageUrl: string;
  bgImage: string;

  
  isHero?: boolean;
  isBanner?: boolean;
  isFeatured?: boolean;
  isArchived?: boolean;
 
  createdAt: string;
}



export interface ImageType {
  id: string;
  url: string;
}
