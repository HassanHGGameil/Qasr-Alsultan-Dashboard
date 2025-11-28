import qs from "query-string";

import { STORE } from "@/lib/constains/constains"; 
import { IProductItem } from "@/types/frontendType/product";

const URL = `${STORE}/api/home/products/productAddtions/productItem`;

interface Query {
  id: string;
}

const getProductItem = async (query: Query): Promise<IProductItem[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      id: query.id,
    },
  });

  const res = await fetch(`${url}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getProductItem;
