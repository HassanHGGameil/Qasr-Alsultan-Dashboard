
import MenuSectionHeroClient from '@/components/StoreActionUi/Menu/MenuHeroSection/MenuSectionHeroClient'
import FilterCategoryProduct from '@/components/StoreActionUi/Menu/MenuProducts/FilterCategoryProduct'
import getCategories from '@/lib/Actions/FrontendAction/getCategories';
import getProducts from '@/lib/Actions/FrontendAction/getProducts';

type PageProps = {
  params: Promise<{ slug: string; isFeatured: string }>;
};


const Menu = async ({ params }: PageProps) => {
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
    <main>
      <MenuSectionHeroClient />
      <FilterCategoryProduct
        categories={sortedCategories.reverse()}
        products={sortedProducts}
      />

    </main>
  )
}

export default Menu