"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "../CellAction/cell-action";
import Image from "next/image";
import ProductColumnType from "@/types/ProductColmunType";

const Columns: ColumnDef<ProductColumnType>[] = [
  {
    accessorKey: "titleEn",
    header: "TitleEn",
  },

  {
    accessorKey: "titleAr",
    header: "TitleAr",
  },

  {
    accessorKey: "images",
    header: "Product Image",
    cell: ({ row }) =>
      row.original.images?.[0]?.url ? (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <Image
            src={row.original.images?.[0]?.url}
            layout="fill"
            objectFit="cover"
            alt="Partner Image"
          />
        </div>
      ) : (
        <span className="text-gray-500">No Image</span>
      ),
  },

  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "categories",
    header: "Category",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    accessorKey: "isFeatured",
    header: "isFeatured",
  },
  {
    accessorKey: "isArchived",
    header: "isArchived",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export default Columns;
