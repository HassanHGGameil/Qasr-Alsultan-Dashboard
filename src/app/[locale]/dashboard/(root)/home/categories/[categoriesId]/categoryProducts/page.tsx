import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import Client from "@/components/PagesActionUi/Home/Categories/CategoryProduct/Client";
import ProductColumnType from "@/types/ProductColmunType";



type PageProps = {
  params: Promise<{ categoriesId: string }>;
};
const CategoryProducts = async ({ params }: PageProps) => {
  const currentUser = await getCurrentUser();

  const category = await prismadb.categories.findUnique({
    where: { id: (await params).categoriesId },
  });

   if (!category) {
    return <div className="px-8 py-5 text-red-500">Category not found.</div>;
  }

  // ✅ Get all products inside selected category
  const products = await prismadb.product.findMany({
    where: {
      categoriesId: (await params).categoriesId,
    },
    include: {
      images: true,
      categories: true,
      productAddtions: true

    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumnType[] = products.map((item) => ({
     id: item.id,
        slugEn: item.slugEn,
        titleEn: item.titleEn,
        titleAr: item.titleAr,
        subtitleEn: item.subtitleEn,
        subtitleAr: item.subtitleAr,
        descriptionEn: item.descriptionEn,
        descriptionAr: item.descriptionAr,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        images: item.images,

        createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const isManagement =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "ADMIN";

  return (
    <>
      {isManagement ? (
        <div className="flex-col w-full">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <Client data={formattedProducts} name={category.nameEn} /> {/* ← Only products */}
          </div>
        </div>
      ) : (
        <div className="px-8 text-blue-500 py-5">
          You Are Not A Manager To View This Data
        </div>
      )}
    </>
  );
};

export default CategoryProducts;
