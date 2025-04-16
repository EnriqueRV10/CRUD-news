'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { useNews } from "@/hooks/useNews";

export default function StatsNews() {
  const { data: news, isLoading } = useNews();

  const stats = {
    published: news?.filter(n => n.status === 'published').length || 0,
    preview: news?.filter(n => n.status === 'preview').length || 0,
    draft: news?.filter(n => n.status === 'draft').length || 0,
  };

  return (
    <div className="mx-1 md:mx-6 my-6">
      <h2 className="mb-6 text-2xl font-semibold">Estadisticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="bg-green-100">
          <CardHeader>
            <CardTitle>Publicado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{stats.published}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100">
          <CardHeader>
            <CardTitle>Previews</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{stats.preview}</p>
          </CardContent>
        </Card>
        <Card className="bg-red-100">
          <CardHeader>
            <CardTitle>Borrador</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{stats.draft}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
