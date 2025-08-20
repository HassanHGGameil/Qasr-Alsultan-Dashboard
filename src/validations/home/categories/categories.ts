import { z } from "zod";

export const createCategoriesSchema = z.object({
  slugEn: z.string().min(2).max(100).optional(),
  slugAr: z.string().min(2).max(100).optional(),
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  imageUrl: z.string().min(1),
});

export interface ICreateCategoriesDto {
  id: string;
  slugEn: string;
  slugAr: string;
  nameEn: string;
  nameAr: string;
  imageUrl: string;
  createdAt: string;
}
