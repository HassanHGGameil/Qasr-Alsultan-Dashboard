import { z } from "zod";

export const createBranchesSchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  imageUrl: z.string().min(1),
  dateEn: z.string().min(1),
  dateAr: z.string().min(1),

  phone: z.string().min(1),
  locationLink: z.string().min(1),
});

export interface ICreateBranchesDto {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  dateEn: string;
  dateAr: string;
  phone: string;
  locationLink: string;
  createdAt: string;
}
