import ProductDetailsCard from "@/components/StoreActionUi/Home/Products/Product/ProductDetails";
import getSingleProduct from "@/lib/Actions/FrontendAction/getSingleProduct";
import React from "react";


type PageProps = {
  params: Promise<{ productId: string; locale?: string }>;
};

export default async function SingleProductPage({ params }: PageProps) {
  const {productId} = await params;

 


  const product = await getSingleProduct(productId);



  return (
    <main>
      <ProductDetailsCard productDetails={product} />
    </main>
  );
}