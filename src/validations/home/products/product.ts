import { z } from "zod";

export const productSchema = z.object({
  slugEn: z.string().min(2).max(100).optional(),
  slugAr: z.string().min(2).max(100).optional(),
  // Basic info
  titleEn: z.string().min(2).max(100),
  titleAr: z.string().min(2).max(100),
  subtitleEn: z.string().min(2).max(200),
  subtitleAr: z.string().min(2).max(200),
  descriptionEn: z.string().min(2).optional(),
  descriptionAr: z.string().min(2).optional(),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(0),
  offer: z.coerce.number().min(0).optional(),
  offerPrice: z.coerce.number().min(0).optional(),
  quantity: z.coerce.number().min(0).optional(),

  categoriesId: z.string().min(1), // Changed from coerce as it should be string
  productAddtionsId: z.string().min(1).optional().nullable(), // Made optional and nullable

  isBestSeller: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});



export interface IProductDto {
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
  offerPrice: number;
  quantity: number;
  categoriesId: string;
  productAddionsId: string;
  images: { url: string }[];
  isBestSeller: boolean;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
}
