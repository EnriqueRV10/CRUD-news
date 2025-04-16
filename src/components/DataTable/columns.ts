'use client'

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

export type NewsItem = {
  id: number
  title: string
  body: string
  start_date: string
  end_date: string
  author: string
  status: "published" | "preview" | "draft"
  read: {
    user: string
    views: number
    last_visited: string
  }[]
}

export const columns:ColumnDef<NewsItem>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "author",
    header: "Autor",
  },
  {
    accessorKey: "start_date",
    header: "Inicio",
    cell: ({ row }) => format(new Date(row.original.start_date), "dd/MM/yyyy"),
  },
  {
    accessorKey: "end_date",
    header: "Fin",
    cell: ({ row }) => format(new Date(row.original.end_date), "dd/MM/yyyy"),
  },
]
