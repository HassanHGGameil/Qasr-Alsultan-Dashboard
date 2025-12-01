import { TSection } from "@/components/StoreActionUi/Home/NewSection/sectionType";
import { STORE } from "@/lib/constains/constains"; 

const URL = `${STORE}/api/sections/mainSection`;

const getMainSection = async (): Promise<TSection[]> => {

  const res = await fetch(`${URL}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getMainSection;