"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "../CellAction/cell-action";
import UserColumnType from "@/types/UserColumnType";
import { Mail, User, Monitor, Shield } from "lucide-react";
import Link from "@/components/common/Link";

// ✅ Reusable Badge component
const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm transition-colors duration-200 ${className}`}
  >
    {children}
  </span>
);

// ✅ Platform mapping
const platformConfig: Record<string, { label: string; className: string }> = {
  WEBSITE: {
    label: "Website",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  MOBILEAPP: {
    label: "Mobile App",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  },
  DASHBOARD: {
    label: "Dashboard",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
};

// ✅ Role mapping
const roleConfig: Record<string, { label: string; className: string }> = {
  USER: {
    label: "User",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  ADMIN: {
    label: "Admin",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  AdminOne: {
    label: "Admin One",
    className:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  },
  AdminTwo: {
    label: "Admin Two",
    className:
      "bg-pink-200 text-pink-800 dark:bg-pink-900/40 dark:text-pink-400",
  },
  MANAGER: {
    label: "Manager",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  OWNER: {
    label: "Owner",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
};

const Columns: ColumnDef<UserColumnType>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        <User className="w-4 h-4" aria-hidden="true" /> Name
      </div>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 cursor-pointer">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        <Mail className="w-4 h-4" aria-hidden="true" /> Email
      </div>
    ),
    cell: ({ getValue }) => {
      const email = getValue<string>();
      return (
        <Link
          href={`mailto:${email}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {email}
        </Link>
      );
    },
  },
  {
    accessorKey: "userPlatform",
    header: () => (
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        <Monitor className="w-4 h-4" aria-hidden="true" /> Platform
      </div>
    ),
    cell: ({ getValue }) => {
      const platform = getValue<string>() as keyof typeof platformConfig;
      const config = platformConfig[platform];
      return (
        <Badge
          className={
            config?.className ||
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }
        >
          {config?.label || platform || "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => (
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        <Shield className="w-4 h-4" aria-hidden="true" /> Role
      </div>
    ),
    cell: ({ getValue }) => {
      const role = getValue<string>() as keyof typeof roleConfig;
      const config = roleConfig[role];
      return (
        <Badge
          className={
            config?.className ||
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }
        >
          {config?.label || role || "-"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export default Columns;
