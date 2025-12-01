import * as z from "zod";


export const BannerSchema = z.object({
  titleEn: z.string().min(2).optional(),
  titleAr: z.string().min(2).optional(),
  subtitleEn: z.string().min(2).optional(),
  subtitleAr: z.string().min(2).optional(),
 
  bannerImages: z
    .array(
      z.object({
        id: z.string().optional(), // if images come from DB
        url: z.string().url("Image must have a valid URL"),
      })
    )
    .nonempty({ message: "At least one image is required" }),
  bgOne: z.string().optional(),
  bgTwo: z.string().optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});



export interface IBannerDto {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  
  bannerImages: { url: string }[];
  bgOne?: string;
  bgTwo?: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  createdAt: string;
}
