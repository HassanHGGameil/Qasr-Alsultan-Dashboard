"use client";
import { Plus } from "lucide-react";
import Columns from "../Columns/Columns";
import UserColumnType from "@/types/UserColumnType";
import { useRouter } from "@/i18n/routing";
import Heading from "@/components/common/Heading/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";


interface UserClientProps {
  data: UserColumnType[];
}

const UsersClient: React.FC<UserClientProps> = ({ data }) => {
  const router = useRouter();

  

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Users (${data.length})`}
          description="Mange Users for your store "
        />

        <Button
          className="bg-green-400"
          onClick={() => router.push(`/users/new `)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="bg-slate-300" />

      <DataTable 
        columns={Columns} 
        data={data} 
        searchKey="name"
        
      />


      <Heading  
        title="API"
        description="API calls for Banner"
        
      />
      <Separator className="bg-slate-300" />

      <ApiList
        entityName="users"
        entityIdName="userId"
      />


    </>
  );
};

export default UsersClient;
