import qs from "query-string";

import { STORE } from "@/lib/constains/constains"; 
import TProduct from "@/types/frontendType/product";


const URL = `${STORE}/api/home/products/product`;

interface Query {
  slugEn?: string;
  slugAr?: string;
  categories?: string;
  productAddions?: string;
}

const getProducts = async (query: Query): Promise<TProduct[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      slugEn: query.slugEn,
      slugAr: query.slugAr,
      categories: query.categories,
      productAddions: query.productAddions,
    },
  });

  const res = await fetch(`${url}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getProducts;
