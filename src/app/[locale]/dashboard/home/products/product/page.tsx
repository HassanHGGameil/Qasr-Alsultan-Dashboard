import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import { formater } from "@/lib/utils/utils";
import ProductColumnType from "@/types/ProductColmunType";
import getCurrentUser from "@/actions/getCurrentUser";
import ProductClient from "@/components/AdminActionUi/Home/Products/Product/ProductClient/ProductClient";

const ProductsPage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      categories: true,
      productAddtions: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedProducts: ProductColumnType[] = products.map((item) => ({
    id: item.id,
    slugEn: item.slugEn,
    titleEn: item.titleEn,
    titleAr: item.titleAr,
    subtitleEn: item.subtitleEn,
    subtitleAr: item.subtitleAr,
    descriptionEn: item.descriptionEn,
    descriptionAr: item.descriptionAr,
    images: item.images,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formater.format(Number(item.price)),
    categories: item.categories.nameEn,
    productAddtions: item.productAddtions?.titleEn,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const currentUser = await getCurrentUser();

  const isMangement =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "ADMIN" ||
    currentUser?.role === "AdminOne";

  return (
    <>
      {isMangement ? (
        <div className="flex-col w-full">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductClient data={formatedProducts} />
          </div>
        </div>
      ) : (
        <div className="px-8 text-blue-500 py-5">
          You Are Not A Manger To Showing Data
        </div>
      )}
    </>
  );
};

export default ProductsPage;
