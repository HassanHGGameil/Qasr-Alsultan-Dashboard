import { z } from "zod";


export const createProductAddionsSchema = z.object({
  titleEn: z.string().min(2).max(100),
  titleAr: z.string().min(2).max(100),
  imageUrl: z.string().min(1),
  productItem: z
    .array(
      z.object({
        nameEn: z.string().min(2).max(100),
        nameAr: z.string().min(2).max(100),
        price: z.coerce.number().min(0).optional(),
        quantity: z.coerce.number().min(1).optional(),
        imageUrl: z.string().min(1),
        productCategoryId: z.string().min(0).optional(),
      })
    )
    .max(100, "You can only add up to 10 items"),
});


export interface IProductAddionsDto {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  price: number;
  categoryId: string;
  sizeId: string;
  colorId: string;
  productItem: productItem[]; // Array of package items (max 10 items)
  imageUrl: string;
  isFeatured: boolean; // Whether the package is featured
  isArchived?: boolean; // Optional: defaults to false
  createdAt?: string; // Optional: must be ISO 8601 if string
}



export interface productItem {
  id: string;
  nameEn: string; // English name of the package item
  nameAr: string; // Arabic name of the package item
  price?: number; // Arabic name of the package item
  quantity?: number; // Arabic name of the package item
  imageUrl: string; // URL of the package item image
  productCategoryId: string;

}

