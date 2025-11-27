"use client";
import { Plus } from "lucide-react";
import Columns from "../Columns/Columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import CategoryColumnType from "@/types/CategoryColmunType";
import { useRouter } from "@/i18n/routing";
import Heading from "@/components/common/Heading/Heading";
import { Button } from "@/components/ui/button";

interface CategoryClientProps {
  data: CategoryColumnType[];
}

const ProductCategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Categories (${data.length})`}
          description="Mange Categories for your store "
        />

        <Button
          className=""
          onClick={() => router.push(`/home/products/productCategory/${"new"}`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="bg-slate-300" />

      <DataTable columns={Columns} data={data} searchKey="nameEn" />
    </>
  );
};

export default ProductCategoryClient;
