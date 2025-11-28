import { STORE } from "@/lib/constains/constains"; 
import TProduct from "@/types/frontendType/product";

const URL = `${STORE}/api/home/products/product`;



const getSingleProduct = async (productId: string): Promise<TProduct> => {
  
  if (!productId) {
    throw new Error("Product slug parameter is required");
  }

  const res = await fetch(`${URL}/${productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${res.statusText}`);
  }

  return res.json();
};

export default getSingleProduct;