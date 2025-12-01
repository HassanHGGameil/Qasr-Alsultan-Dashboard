"use client";
import { Plus } from "lucide-react";
import Columns from "../Columns/Columns";
import { useSession } from "next-auth/react";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import CategoryColumnType from "@/types/CategoryColmunType";
import { useRouter } from "@/i18n/routing";
import Heading from "@/components/common/Heading/Heading";
import { Button } from "@/components/ui/button";

interface CategoryClientProps {
  data: CategoryColumnType[];
}

const BranchesClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const user = session?.user?.role === "MANGER";

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Branches (${data.length})`}
          description="Mange Branches for your store "
        />

        <Button className="" onClick={() => router.push(`/dashboard/home/branches/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="bg-slate-300" />

      <DataTable columns={Columns} data={data} searchKey="nameEn" />

      {user ? (
        <>
          <Heading title="API" description="API calls for categories" />
          <Separator className="bg-slate-300" />

          <ApiList entityName="categories" entityIdName="caytegoriesId" />
        </>
      ) : null}
    </>
  );
};

export default BranchesClient;
