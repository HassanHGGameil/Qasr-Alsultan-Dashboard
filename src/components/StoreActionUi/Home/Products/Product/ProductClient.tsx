import GridList from "@/components/LogicList/GridList/GridList";
import ProductCard from "./ProductCard";

import CartHome from "../../CartHome/CartHome";
import getProducts from "@/lib/Actions/FrontendAction/getProducts";
import TProduct from "@/types/frontendType/product";

const ProductClient = async () => {
  const products = await getProducts({});
  console.log("products", products);

  const renderProductItem = (item: TProduct) => (
    <ProductCard key={item.id} productItem={item} />
  );

  return (
    <section className=" bg-gradient-to-r  dark:from-gray-800 dark:to-gray-900 mb-8 lg:my-8 lg:py-5 rounded-md shadow-sm">
      <div className="container">
        {/*  */}
        <div className="flex flex-col-reverse  lg:flex-row-reverse items-center gap-10">
          <div className="w-full  py-2 lg:w-[30%]">
            <CartHome />
          </div>
          <GridList<TProduct>
            records={products}
            renderItem={renderProductItem}
            emptyMessage="No products available"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 lg:gap-6"
          />
        </div>

      </div>
    </section>
  );
};

export default ProductClient;
