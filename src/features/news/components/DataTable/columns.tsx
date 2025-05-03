"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ActionsCell from "./actionsCell";

export type NewsItem = {
  id: number;
  title: string;
  body: string;
  start_date: string;
  end_date: string;
  author: string;
  status: "published" | "preview" | "draft";
  read: {
    user: string;
    views: number;
    last_visited: string;
  }[];
};

const statusClass = {
  published: "bg-green-100 text-green-800",
  preview: "bg-yellow-100 text-yellow-800",
  draft: "bg-gray-100 text-gray-800",
};

export const columns: ColumnDef<NewsItem>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => {
      const title = row.getValue("title") as NewsItem["title"];
      return (
        <a
          href={`/news/${row.original.id}`}
          className=" hover:underline hover:text-neutral-600"
        >
          {title}
        </a>
      );
    },
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
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as NewsItem["status"];
      return <Badge className={statusClass[status]}>{status}</Badge>;
    },
  },
  {
    accessorKey: "read",
    header: "Lecturas",
    cell: ({ row }) => {
      const readers = row.getValue("read") as NewsItem["read"];
      const totalViews = readers.reduce((acc, r) => acc + r.views, 0);
      return <span>{totalViews}</span>;
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const newsItem = row.original;
      return <ActionsCell newsItem={newsItem} />;
    },
  },
];
