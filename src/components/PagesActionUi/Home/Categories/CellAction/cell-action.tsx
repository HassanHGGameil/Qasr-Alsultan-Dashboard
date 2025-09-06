import { Copy, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/Modals/alert-modal";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { DOMAIN } from "@/lib/constains/constains";
import CategoryColumnType from "@/types/CategoryColmunType";

interface CellActionProps {
  data: CategoryColumnType;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category Id Copied to the clipboard");
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/home/categories/${data.id}`);
      router.refresh();
      router.push(`/home/categories`);
      toast.success("Category Deleted.");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Make sure you removed all products using this category first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCopy(data.id)}
          title="Copy ID"
        >
          <Copy className="h-4 w-4" />
        </Button>

        <Button
         

          variant="ghost"
          size="icon"
          onClick={() => router.push(`/home/categories/${data.id}`)}
          aria-label="Edit Order"
          className="hover:bg-blue-100 hover:text-blue-600 transition-colors"

          title="Edit"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          title="Delete"
          className="text-red-600 hover:text-red-600"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;