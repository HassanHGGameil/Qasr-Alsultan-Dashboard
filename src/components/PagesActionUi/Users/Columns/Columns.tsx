"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "../CellAction/cell-action";
import UserColumnType from "@/types/UserColumnType";
import { Mail, User, Monitor, Shield, Calendar } from "lucide-react";

// Utility for date formatting
const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const roleColors: Record<string, string> = {
  admin: "bg-red-100 text-red-700",
  user: "bg-blue-100 text-blue-700",
  manager: "bg-green-100 text-green-700",
};

const Columns: ColumnDef<UserColumnType>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" /> Name
      </div>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500" /> Email
      </div>
    ),
    cell: ({ getValue }) => {
      const email = getValue<string>();
      return (
        <a
          href={`mailto:${email}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {email}
        </a>
      );
    },
  },
  {
    accessorKey: "userPlatform",
    header: () => (
      <div className="flex items-center gap-2">
        <Monitor className="w-4 h-4 text-gray-500" /> Platform
      </div>
    ),
    cell: ({ getValue }) => {
      const platform = getValue<string>();
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          {platform
            ? platform.charAt(0).toUpperCase() + platform.slice(1)
            : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => (
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-gray-500" /> Role
      </div>
    ),
    cell: ({ getValue }) => {
      const role = getValue<string>()?.toLowerCase() || "user";
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            roleColors[role] || "bg-gray-100 text-gray-700"
          }`}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" /> Date
      </div>
    ),
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {formatDate(getValue<string>())}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export default Columns;
