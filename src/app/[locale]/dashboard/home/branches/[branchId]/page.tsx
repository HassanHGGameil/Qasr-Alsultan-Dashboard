import BranchesForm from "@/components/AdminActionUi/Home/Branches/BranchesForm/BranchesForm";
import prismadb from "@/lib/prismaDB/prismadb";

type PageProps = {
  params: Promise<{ branchId: string }>;
};

const CategoriesPage = async ({ params }: PageProps) => {
  // For new brand creation
  if ((await params).branchId === "new") {
    return (
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BranchesForm initialData={null} />
        </div>
      </div>
    );
  }

  const branches = await prismadb.branches.findUnique({
    where: {
      id: (await params).branchId,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BranchesForm initialData={branches} />
      </div>
    </div>
  );
};

export default CategoriesPage;
