
import getBranches from "@/lib/Actions/FrontendAction/getBranches";
import BranchCard from "./BranchCard";

const BranchesClient = async () => {
  const branches = await getBranches();

  return (
    <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {branches.map((branch) => (
        <div key={branch.id} className="">
          <BranchCard brancheData={branch} />
        </div>
      ))}
      </div>
    </section>
  );
};

export default BranchesClient;
