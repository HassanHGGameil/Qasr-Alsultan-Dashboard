"use client";

import { Plus } from "lucide-react";
import Columns from "../Columns/Columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ProductAdditionColumntype from "@/types/ProductAdditionColumntype";
import Heading from "@/components/common/Heading/Heading";
import { useRouter } from "@/i18n/routing";

interface productAddtionsClientProps {
  data: ProductAdditionColumntype[];
}

const ProductAddtionsClient: React.FC<productAddtionsClientProps> = ({
  data,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`User Products PKG (${data.length})`}
          description="Mange ProductAddtions for your store "
        />

        <Button
          className="bg-green-400"
          onClick={() => router.push(`/home/products/productAddtions/new `)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="bg-slate-300" />

      <DataTable columns={Columns} data={data} searchKey="titleEn" />

      {/* <Heading title="API" description="API calls for products" />
      <Separator className="bg-slate-300" />

      <ApiList entityName="productAddtions" entityIdName="productAddtionsId" /> */}
    </>
  );
};

export default ProductAddtionsClient;
