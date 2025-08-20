import ProductForm from "@/components/PagesActionUi/Home/Products/Product/ProductForm/ProductForm";
import prismadb from "@/lib/prismaDB/prismadb";


type PageProps = {
  params: Promise<{ productId: string}>;
};

export default async function ProductPage({ params }: PageProps) {



  const productAddtions = await prismadb.productAddtions.findMany();
  const categories = await prismadb.categories.findMany();

  
  // For new brand creation
  if ((await params).productId === "new") {
    return (
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm initialData={null} categories={categories} productAddtions={productAddtions} />
        </div>
      </div>
    );
  }




  const product = await prismadb.product.findUnique({
    where: {
      id: (await params).productId,
    },
    include: {
      images: true,
      productAddtions: true,
      categories: true,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} categories={categories} productAddtions={productAddtions} />
      </div>
    </div>
  );
};

