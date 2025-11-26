import ProductCategoryForm from "@/components/PagesActionUi/Home/Products/ProductCategory/ProductCategoryForm/ProductCategoryForm";
import prismadb from "@/lib/prismaDB/prismadb";

type PageProps = {
  params: Promise<{ productCategoryId: string }>;
};

const CategoryPage = async ({ params }: PageProps) => {
  // For new brand creation
  if ((await params).productCategoryId === "new") {
    return (
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductCategoryForm initialData={null} />
        </div>
      </div>
    );
  }

  const productCategory = await prismadb.productCategory.findUnique({
    where: {
      id: (await params).productCategoryId,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductCategoryForm initialData={productCategory} />
      </div>
    </div>
  );
};

export default CategoryPage;
