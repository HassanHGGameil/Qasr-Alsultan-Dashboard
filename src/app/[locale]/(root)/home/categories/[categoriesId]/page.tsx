
import CategoriesForm from "@/components/PagesActionUi/Home/Categories/CategoriesForm/CategoriesForm";
import prismadb from "@/lib/prismaDB/prismadb";

type PageProps = {
  params: Promise<{ categoriesId: string }>;
};

const CategoriesPage = async ({
  params,
}: PageProps) => {


  // For new brand creation
  if ((await params).categoriesId === "new") {
    return (
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoriesForm initialData={null} />
        </div>
      </div>
    );
  }


  const categories = await prismadb.categories.findUnique({
    where: {
      id: (await params).categoriesId,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesForm initialData={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
