'use client'

import Header from "@/components/header";
import { columns } from "@/components/DataTable/columns";
import { DataTable } from "@/components/DataTable/dataTable";
import { useNews } from "@/hooks/useNews";

export default function Home() {
  const { data: news, isLoading } = useNews();


  return (
    <main>
      <Header />
      <DataTable columns={columns} data={news || []} />
    </main>
  );
}
