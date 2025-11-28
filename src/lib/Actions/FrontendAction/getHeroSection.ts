import { THero } from "@/components/StoreActionUi/Home/Hero/heroType"; 
import { STORE } from "@/lib/constains/constains"; 

const URL = `${STORE}/api/hero`;

const getHero = async (): Promise<THero[]> => {

  const res = await fetch(`${URL}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getHero;