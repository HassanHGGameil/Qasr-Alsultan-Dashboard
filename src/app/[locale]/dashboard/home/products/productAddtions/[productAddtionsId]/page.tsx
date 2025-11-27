import ProductAddionsForm from "@/components/AdminActionUi/Home/Products/ProductAddtions/ProductAddtionsForm/ProductAddtionsForm";
import prismadb from "@/lib/prismaDB/prismadb";

type PageProps = {
  params: Promise<{ productAddtionsId: string }>;
};

const productAddtions = async ({ params }: PageProps) => {
  const productCategory = await prismadb.productCategory.findMany();

  // For new brand creation
  if ((await params).productAddtionsId === "new") {
    return (
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductAddionsForm
            initialData={null}
            productCategory={productCategory}
          />
        </div>
      </div>
    );
  }

  const productAddtions = await prismadb.productAddtions.findUnique({
    where: {
      id: (await params).productAddtionsId,
    },
    include: {
      productItem: true,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductAddionsForm
          initialData={productAddtions}
          productCategory={productCategory}
        />
      </div>
    </div>
  );
};

export default productAddtions;
