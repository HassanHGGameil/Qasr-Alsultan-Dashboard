import FilterCategoryProduct from "@/components/StoreActionUi/Home/FilterCategoryProduct/FilterCategoryProduct";
import HeroClient from "@/components/StoreActionUi/Home/Hero/HeroClient";
import HomeSectionClient from "@/components/StoreActionUi/Home/NewSection/SectionClient";
import ProductSlideClient from "@/components/StoreActionUi/Home/Products/ProductSlides/ProductSlideClient";
import getCategories from "@/lib/Actions/FrontendAction/getCategories";
import getProducts from "@/lib/Actions/FrontendAction/getProducts";

type PageProps = {
  params: Promise<{ slug: string; isFeatured: string }>;
};

export default async function Home({ params }: PageProps) {
  const { slug } = await params;
  const { isFeatured } = await params;

  const categories = await getCategories({
    slug: slug,
    isFeatured: isFeatured,
  });

  const sortedCategories = categories.sort((a, b) => a.position - b.position);

  const products = await getProducts({});

    const sortedProducts = products.sort((a, b) => a.position - b.position);



  return (
    <main className="">
      <HeroClient />
      <ProductSlideClient products={products} />

      <FilterCategoryProduct
        categories={sortedCategories.reverse()}
        products={sortedProducts}
      />
      <HomeSectionClient />
      {/* <NewSection /> */}
    </main>
  );
}
