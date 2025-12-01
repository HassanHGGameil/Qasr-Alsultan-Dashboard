import { TBranches } from "@/components/StoreActionUi/Branches/Branch/branchType";
import { STORE } from "@/lib/constains/constains"; 

const URL = `${STORE}/api/home/branches`;

const getBranches = async (): Promise<TBranches[]> => {

  const res = await fetch(`${URL}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getBranches;