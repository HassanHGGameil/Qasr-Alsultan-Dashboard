import { z } from "zod";

export const createProductCategorySchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  imageUrl: z.string().min(1),
});



export interface ICreateProductCategoryDto {
  id: string;
  nameEn: string;
  nameAr: string;
  imageUrl: string;
  createdAt: string;
}
