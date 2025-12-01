import CategoriesForm from "@/components/AdminActionUi/Home/Categories/CategoriesForm/CategoriesForm";
import prismadb from "@/lib/prismaDB/prismadb";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ categoriesId: string }>;
};

const CategoriesPage = async ({ params }: PageProps) => {
  try {

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
  } catch (error) {
    console.error(
      `Failed to fetch order ${(await params).categoriesId}:`,
      error
    );
    return notFound();
  }
};

export default CategoriesPage;
