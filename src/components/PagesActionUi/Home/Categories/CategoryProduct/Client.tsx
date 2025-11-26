"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/common/Heading/Heading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosErrorHandler } from "@/utils";
import ListGroupAction from "./ListGroupAction";
import ProductColumnType from "@/types/ProductColmunType";
import { DOMAIN } from "@/lib/constains/constains";

interface CategoryClientProps {
  data: ProductColumnType[];
  name?: string;
}

const Client: React.FC<CategoryClientProps> = ({ data, name }) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      await axios.put(`/api/home/products/product/reorder`, { list: updateData });
      toast.success("Products reordered successfully!");
    } catch (error) {
      toast.error("Failed to reorder products.");
      axiosErrorHandler(error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/home/products/product/${id}`);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/home/products/product/${id}`);
      toast.success(`${name || "Item"} deleted successfully.`);
      router.push(`/home/categories`);
    } catch (error) {
      toast.error(
        "Make sure you removed all products and categories using this category first."
      );
      axiosErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Heading
          title={`${name?.toLocaleUpperCase()} (${data?.length ?? 0})`}
          description="Manage brands for your store"
        />
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <Separator className="bg-slate-300" />

      <ListGroupAction
        items={data}
        onEdit={handleEdit}
        onDelete={onDelete}
        onReorder={handleReorder}
      />

      <Separator className="bg-slate-300" />
    </>
  );
};

export default Client;
