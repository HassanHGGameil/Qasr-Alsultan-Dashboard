"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/Modals/alert-modal";
import { Role } from "@prisma/client";
import UserColumnType from "@/types/UserColumnType";
import { useRouter } from "@/i18n/routing";
import { DOMAIN } from "@/lib/constains/constains";
import { axiosErrorHandler } from "@/utils";

interface CellActionProps {
  data: UserColumnType;
}

const roles: Role[] = ["OWNER", "MANAGER", "ADMIN", "USER"];

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Update Role
  const updateRole = async (role: Role | string) => {
    if (!data.id) return;
    setLoading(true);
    try {
      await axios.patch(`${DOMAIN}/api/users/${data.id}`, { role });
      toast.success("Role updated successfully");
      router.refresh();
    } catch (error) {
      axiosErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/users/${data.id}`);
      toast.success("User Deleted.");
      setOpen(false);
      router.push(`/users`);
      router.refresh();
    } catch (error) {
      axiosErrorHandler(error);
    } finally {
      setLoading(false);
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Change Role</DropdownMenuLabel>
          {roles.map((role) => (
            <DropdownMenuItem
              key={role}
              onClick={() => updateRole(role)}
              disabled={loading}
              className={`cursor-pointer ${
                data.role === role ? "bg-muted text-primary" : ""
              }`}
            >
              <Edit className="mr-2 h-4 w-4" />
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          {/* Custom roles */}
          <DropdownMenuItem
            onClick={() => updateRole("AdminOne")}
            disabled={loading}
          >
            <Edit className="mr-2 h-4 w-4" /> Admin One
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateRole("AdminTwo")}
            disabled={loading}
          >
            <Edit className="mr-2 h-4 w-4" /> Admin Two
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            disabled={loading}
            className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
