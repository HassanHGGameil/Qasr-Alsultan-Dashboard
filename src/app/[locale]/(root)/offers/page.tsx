import OffersFilterProduct from "@/components/StoreActionUi/Offers/OffersFilterProduct/OffersFilterProduct";
import OffersHeroClient from "@/components/StoreActionUi/Offers/OffersSectionHeroClient.tsx/OffersHeroClient";
import getProducts from "@/lib/Actions/FrontendAction/getProducts";
import React from "react";

const OffersPage = async ()  => {

   const products = await getProducts({});

  const OffersProductcategory = products.filter((item) => item.categoriesId === "68a7139e5dbecfadf378d695")



  return (
    <main>
      <OffersHeroClient />
      <OffersFilterProduct products={OffersProductcategory} />
    </main>
  );
};

export default OffersPage;
