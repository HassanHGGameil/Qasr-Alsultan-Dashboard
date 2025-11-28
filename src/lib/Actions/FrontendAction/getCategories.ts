import qs from "query-string";

import { STORE } from "@/lib/constains/constains"; 
import { CategoryDto } from "@/types/frontendType/categoroies"; 

const URL = `${STORE}/api/home/categories`;
interface Query {
  slug?: string;
  isHero?: string;
  isFeatured?: string;
}

const getCategories = async (query: Query): Promise<CategoryDto[]> => {

  const url = qs.stringifyUrl({
      url: URL,
      query: {
        slug: query.slug,
        isFeatured: query.isFeatured,
      },
    });
 

  const res = await fetch(`${url}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getCategories;
