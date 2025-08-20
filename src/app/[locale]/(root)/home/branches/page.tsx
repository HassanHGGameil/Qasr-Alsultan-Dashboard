import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import CategoryColumnType from "@/types/CategoryColmunType";
import BranchesClient from "@/components/PagesActionUi/Home/Branches/BranchesClient/BranchesClient";

const CategoriesPage = async () => {
  const currentUser = await getCurrentUser();

  const branches = await prismadb.branches.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedBranches: CategoryColumnType[] = branches.map((item) => ({
    id: item.id,
    nameEn: item.nameEn,
    nameAr: item.nameAr,
    imageUrl: item.imageUrl,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const isMangement =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "ADMIN";

  return (
    <>
      {isMangement ? (
        <div className="flex-col w-full">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <BranchesClient data={formatedBranches} />
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
