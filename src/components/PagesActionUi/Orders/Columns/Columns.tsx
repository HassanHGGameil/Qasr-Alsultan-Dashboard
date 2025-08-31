"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  Undo2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import CellActon from "../CellAction/cell-action";
import OrderColumnType from "@/types/OrderColumnType";
import { Badge } from "@/components/ui/badge";
import { PiEmpty } from "react-icons/pi";

// Status definitions with icons and colors
const ORDER_STATUS = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  PROCESSING: {
    label: "Processing",
    icon: Clock,
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  },
  DELIVERED: {
    label: "Delivered",
    icon: PackageCheck,
    color: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    color: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  RETURNED: {
    label: "Returned",
    icon: Undo2,
    color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  },
} as const;

type OrderStatus = keyof typeof ORDER_STATUS;

const Columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const order = row.original;
      const isNew =
        new Date(order.createdAt).getTime() > Date.now() - 5 * 60 * 1000; // 5 minutes

      return (
        <div className="flex items-center gap-2">
          {isNew && (
            <div className="flex items-center gap-1">
              <Sparkles className="text-yellow-500" size={16} />
              <Badge
                variant="secondary"
                className="text-xs bg-yellow-100 text-yellow-800"
              >
                New
              </Badge>
            </div>
          )}
          <span>{order.name || "Customer"}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const totalPrice = row.original.totalPrice;

      return (
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-blue-100 text-slate-900  font-medium">
          <span className="text-xs">{"EGY"}</span>
          <span className="">{totalPrice}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toUpperCase() as OrderStatus;
      const statusInfo = ORDER_STATUS[status] || {
        label: status,
        color: "bg-gray-100 text-gray-800",
      };

      return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
    },
  },

  {
    accessorKey: "isPaid",
    header: "Payment Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.original.isPaid ? (
          <CheckCircle className="text-green-500" size={18} />
        ) : (
          <PiEmpty size={18} />
        )}
        {row.original.isPaid ? "Paid" : "Unpaid"}
      </div>
    ),
  },

  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      const branch = row.original.branch;

      if (branch) {
        return (
          <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 font-medium">
            {branch}
          </span>
        );
      }

      return (
        <span className="px-2 py-1 rounded-md bg-blue-100 text-green-700 font-medium">
          Cash On Delivery
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActon data={row.original} />,
  },
];

export default Columns;
