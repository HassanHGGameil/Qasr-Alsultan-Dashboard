// import { Role } from "@prisma/client";
import { z } from "zod";

// Make Zod To make Validateion




// __________ Create Hero Section Schema ___________________

// export const createUserSchema = z.object({
  
//   role: z.nativeEnum(Role),  // Use the Prisma enum directly

// });



// ============ HOME Page ValidationScema - START =========================


// Create Articale Schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string ",
    })
    .min(2, {message: "title should be at least 2 characters long"})
    .max(200,  {message: "title should be least than 200 characters long"}),
  description: z.string().min(2).max(200),
});


// __________ Create Product Schema ___________________
export const createProductSchema = z.object({
  titleEn: z.string().min(2).max(100),
  titleAr: z.string().min(2).max(100),
  subtitleEn: z.string().min(2),
  subtitleAr: z.string().min(2),
  descriptionEn: z.string().min(2).max(500).trim(),
  descriptionAr: z.string().min(2).max(500).trim(),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(0),
  offer: z.coerce.number().min(0).optional(),
  offerPrice: z.coerce.number().min(0).optional(),
  categoryId: z.coerce.number().min(0),
  
  pkgRecipesId: z.coerce.number().min(0),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});




export const userCreatePkgSchema = z.object({
  titleEn: z.string().min(2).max(100),
  titleAr: z.string().min(2).max(100),
  subtitleEn: z.string().min(2),
  subtitleAr: z.string().min(2),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  imageUrl: z.string().min(1),

  pkgItem: z
    .array(
      z.object({
        nameEn: z.string().min(2).max(100),
        nameAr: z.string().min(2).max(100),
        imageUrl: z.string().min(1),
      })
    )
    .max(10, "You can only add up to 10 items"),
});






// __________ Create Category Schema ___________________
export const createPkgRecipesSchema = z.object({
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
        itemsCategoryId: z.coerce.number().min(1),

      })
    )
    .max(100, "You can only add up to 10 items"),
});



// __________ Create Category Schema ___________________
export const createCategorySchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  imageUrl: z.string().min(1),
  billboardId: z.coerce.number().min(1),
});


// __________ Create Category Schema ___________________
export const createItemsCategorySchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  imageUrl: z.string().min(1),
});



// __________ Create Hero Section Schema ___________________

export const createHeroSchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  imageUrl: z.string().min(1).optional(),
  titleEn: z.string().min(2).max(100),
  titleAr: z.string().min(2).max(100),
  subtitleEn: z.string().min(2),
  subtitleAr: z.string().min(2),
  heroImages: z.object({ url: z.string() }).array(),
  heroWords: z
    .array(
      z.object({
        wordEn: z.string().min(0).max(100),
        wordAr: z.string().min(0).max(100),
      }),
    )
    .max(10, "You can only add up to 10 items"),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});




// __________ Create Hero Section Schema ___________________

export const createBannerSchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  titleEn: z.string().min(2).max(100),
  titleAr: z.string().min(2).max(100),
  subtitleEn: z.string().min(2),
  subtitleAr: z.string().min(2),
  link: z.string().min(2).optional(),
  bannerImages: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});






// _______ Create Shipping _______

export const createShippingSchema = z.object({
  nameEn: z.string().min(2).max(100),
  nameAr: z.string().min(2).max(100),
  imageUrl: z.string().min(1),
  shippingCountryId: z.coerce.number().min(0),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});


export const createShippingCountry = z.object({
  nameEn: z.string().min(2).max(100),
  nameAr: z.string().min(2).max(100),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  imageUrl: z.string().min(1),
  shippingZone: z
    .array(
      z.object({
        nameEn: z.string().min(2).max(100),
        nameAr: z.string().min(2).max(100),
        price: z.coerce.number().min(0).optional(),
        imageUrl: z.string().min(1),
        shippingCountryId: z.coerce.number().min(1),

      })
    )
    .max(10, "You can only add up to 10 items"),
});



