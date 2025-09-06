"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "../CellAction/cell-action";
import Image from "next/image";
import ProductColumnType from "@/types/ProductColmunType";

const Columns: ColumnDef<ProductColumnType>[] = [
  {
    accessorKey: "titleEn",
    header: "Title (EN)",
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">{row.original.titleEn}</span>
    ),
  },
  {
    accessorKey: "titleAr",
    header: "Title (AR)",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.original.titleAr}</span>
    ),
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) =>
      row.original.images?.[0]?.url ? (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <Image
            src={row.original.images[0].url}
            alt={row.original.titleEn || "Product Image"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <span className="text-xs text-gray-400">No Image</span>
      ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-gray-800 font-semibold">${row.original.price}</span>
    ),
  },

  {
    accessorKey: "categories",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">{row.original.categories}</span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${
          row.original.isFeatured
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {row.original.isFeatured ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${
          row.original.isArchived
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {row.original.isArchived ? "Yes" : "No"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export default Columns;
