"use client";

import {  Edit, } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useCallback } from "react";
import axios from "axios";
import AlertModal from "@/components/Modals/alert-modal";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { DOMAIN } from "@/lib/constains/constains";
import OrderColumnType from "@/types/OrderColumnType";

interface CellActionProps {
  data: OrderColumnType;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // const onCopy = useCallback(async (id: string) => {
  //   try {
  //     await navigator.clipboard.writeText(id);
  //     toast.success("Order ID copied!");
  //   } catch {
  //     toast.error("Failed to copy ID.");
  //   }
  // }, []);

  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/orders/${data.id}`);
      router.refresh();
      toast.success("Order deleted.");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete. Try again."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }, [data.id, router]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center space-x-2">
        {/* Copy */}
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => onCopy(data.id)}
          aria-label="Copy Order ID"
          className="hover:bg-green-100 hover:text-green-600 transition-colors"
        >
          <Copy className="h-4 w-4" />
        </Button> */}

        {/* Edit */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/orders/${data.id}`)}
          aria-label="Edit Order"
          className="hover:bg-blue-100 hover:text-blue-600 transition-colors"
        >
          <Edit className="h-4 w-4" />
        </Button>

        {/* Delete */}
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Delete Order"
          className="hover:bg-red-100 hover:text-red-600 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button> */}
      </div>
    </>
  );
};

export default CellAction;
