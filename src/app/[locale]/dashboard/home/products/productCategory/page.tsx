import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import CategoryColumnType from "@/types/CategoryColmunType";
import ProductCategoryClient from "@/components/AdminActionUi/Home/Products/ProductCategory/ProductCategoryClient/ProductCategoryClient";

const CategoriesPage = async () => {
  const currentUser = await getCurrentUser();

  const productCategory = await prismadb.productCategory.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedCategories: CategoryColumnType[] = productCategory.map(
    (item) => ({
      id: item.id,
      nameEn: item.nameEn,
      nameAr: item.nameAr,
      imageUrl: item.imageUrl,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  const isMangement =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "ADMIN";

  return (
    <>
      {isMangement ? (
        <div className="flex-col w-full">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductCategoryClient data={formatedCategories} />
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

export default CategoriesPage;
