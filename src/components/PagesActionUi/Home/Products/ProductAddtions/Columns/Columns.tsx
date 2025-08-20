"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "../CellAction/cell-action";
import ProductAdditionColumntype from "@/types/ProductAdditionColumntype";



const Columns: ColumnDef<ProductAdditionColumntype>[] = [
  {
    accessorKey: "titleEn",
    header: "TitleEn",
  },
  {
    accessorKey: "titleAr",
    header: "TitleAr",
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
