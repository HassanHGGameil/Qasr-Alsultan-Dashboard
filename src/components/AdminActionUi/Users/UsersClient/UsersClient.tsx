"use client";
import Columns from "../Columns/Columns";
import UserColumnType from "@/types/UserColumnType";
import Heading from "@/components/common/Heading/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface UserClientProps {
  data: UserColumnType[];
}

const UsersClient: React.FC<UserClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Users (${data.length})`}
          description="Mange Users for your store "
        />

      </div>
      <Separator className="bg-slate-300" />

      <DataTable columns={Columns} data={data} searchKey="name" />
    </>
  );
};

export default UsersClient;
