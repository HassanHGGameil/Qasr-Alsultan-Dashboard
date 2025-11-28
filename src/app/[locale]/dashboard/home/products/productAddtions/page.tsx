import { format } from "date-fns";

import prismadb from "@/lib/prismaDB/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";
import ProductAdditionColumntype from "@/types/ProductAdditionColumntype";
import ProductAddtionsClient from "@/components/AdminActionUi/Home/Products/ProductAddtions/ProductAddtionsClient/ProductAddtionsClient";

const PkgRecipes = async () => {
  const productAddtions = await prismadb.productAddtions.findMany({
    include: {
      productItem: {
        include: {
          productCategory: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedProductAddtions: ProductAdditionColumntype[] =
    productAddtions.map((item) => ({
      id: item.id,
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      imageUrl: item.imageUrl,
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
            <ProductAddtionsClient data={formatedProductAddtions} />
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

export default PkgRecipes;
