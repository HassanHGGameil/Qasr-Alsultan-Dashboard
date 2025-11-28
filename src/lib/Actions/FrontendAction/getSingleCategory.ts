import { STORE } from "@/lib/constains/constains"; 
import { CategoryDto } from "@/types/frontendType/categoroies";

const URL = `${STORE}/api/home/categories`;

const getSingleCategory = async (slug: string): Promise<CategoryDto> => {
  if (!slug) {
    throw new Error("categoryId parameter is required");
  }

  const res = await fetch(`${URL}/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${res.statusText}`);
  }

  return res.json();
};

export default getSingleCategory;