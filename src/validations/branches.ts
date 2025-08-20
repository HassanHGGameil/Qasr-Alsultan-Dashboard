import { z } from "zod";

export const createBranchesSchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  imageUrl: z.string().min(1),
});

export interface ICreateBranchesDto {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  createdAt: string;
}
