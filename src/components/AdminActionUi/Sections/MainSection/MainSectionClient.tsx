"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import Heading from "@/components/common/Heading/Heading";
import { DOMAIN } from "@/lib/constains/constains";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosErrorHandler } from "@/utils";
import { useState } from "react";
import HeroListGroupAction from "./MainSectionListGroupAction";
import MainSectionColumnType from "@/types/MainSectionType";

interface HeroClientProps {
  data: MainSectionColumnType[];
}

const MainSectionClient: React.FC<HeroClientProps> = ({ data }) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false);

  const handleReorder = async (
    updateData: { id: string; position: number }[]
  ) => {
    // Optimistically update the UI: ListGroupAction already does this
    try {
      await axios.put(`/api/sections/mainSection/reorder`, { list: updateData });
      toast.success("Main Section reordered successfully!");
      // ✅ Avoid router.refresh() here; it can snap items back
      // router.refresh();
    } catch (error) {
      toast.error("Failed to reorder Main Section.");
      axiosErrorHandler(error);
    }
  };

  // Handle edit click
  const handleEdit = (id: string) => {
    router.push(`/dashboard/sections/mainSection/${id}`);
  };

  // Handle delete click
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/sections/mainSection/${id}`);
      router.refresh();
      router.push(`/dashboard/hero`);
      toast.success("brand Deleted.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Make sure you removed all products and categories usning this category first."
      );
      axiosErrorHandler(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Our Main Sections (${data.length})`}
          description="Mange Banners for your store "
        />

        <Button className="" onClick={() => router.push(`/dashboard/sections/mainSection/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="bg-slate-300" />

      {/* List (draggable) */}
      <HeroListGroupAction
        items={data}
        onEdit={handleEdit}
        onDelete={onDelete}
        onReorder={handleReorder}
      />
      <Separator className="bg-slate-300" />
    </>
  );
};

export default MainSectionClient;
