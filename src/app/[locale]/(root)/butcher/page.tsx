

import BucherFilterProduct from '@/components/StoreActionUi/Butcher/ButcherProducts/BucherFilterProduct'
import ButcherHeroClient from '@/components/StoreActionUi/Butcher/ButcherSectionHeroClient.tsx/ButcherHeroClient'
import getProducts from '@/lib/Actions/FrontendAction/getProducts';
import React from 'react'



export default async function Butchers() {
 

  const products = await getProducts({});

  const butcherProductcategory = products.filter((item) => item.categoriesId === "692ab396650369b61650c223")




  return (
    <main>
      <ButcherHeroClient />

      <BucherFilterProduct  products={butcherProductcategory}  />


    </main>
  )
}

