"use client";

import Header from "@/features/news/components/header";
import { columns } from "@/features/news/components/DataTable/columns";
import { DataTable } from "@/features/news/components/DataTable/dataTable";
import { useNews } from "@/hooks/useNews";

export default function Home() {
  const { data: news } = useNews();

  return (
    <main>
      <Header />
      <DataTable columns={columns} data={news || []} />
    </main>
  );
}
