import axiosInstance from "@/services/axiosInstance";

// Obtener todas las noticias con paginación, filtro de estado y búsqueda
export const fetchNews = async ({
  status = 1,
  publish_status,
  page,
  pageSize,
  search = '',
  subordinates = 'all', // este campo no se usa con JSON Server pero se mantiene por compatibilidad
}: {
  status: number;
  publish_status?: number;
  page: number;
  pageSize: number;
  search?: string;
  subordinates?: string;
}) => {
  const params: Record<string, any> = {
    status,
    _page: page,
    _limit: pageSize,
  };

  if (publish_status !== undefined) {
    params.publish_status = publish_status;
  }

  if (search) {
    params.q = search;
  }

  const response = await axiosInstance.get('/news', { params });

  const filteredNews = response.data.map((news: any) => ({
    key: news.id,
    title: news.title,
    author: news.author,
    start: news.start,
    end: news.end,
    status: news.publish_status,
    stats: Array.isArray(news.read)
      ? new Set(news.read.map((r: any) => r.actor__code)).size
      : 0,
  }));

  return {
    results: filteredNews,
    total: Number(response.headers['x-total-count']) || filteredNews.length,
    currentPage: page,
    pageSize,
  };
};

// Obtener contadores de noticias en frontend (publicadas, borradores, programadas)
export const fetchNewsCounters = async ({
  status = 1,
  subordinates = 'all',
}: {
  status?: number;
  subordinates?: string;
}) => {
  const { results } = await fetchNews({
    status: status ?? 1,
    page: 1,
    pageSize: 1000,
    subordinates: subordinates ?? 'all',
    search: '',
  });

  const published = results.filter((n: any) => n.status === 1).length;
  const draft = results.filter((n: any) => n.status === 0).length;
  const scheduled = results.filter((n: any) => n.status === 2).length;

  return {
    total: results.length,
    published,
    draft,
    scheduled,
  };
};

// Obtener una noticia por ID
export const fetchSingleNews = async (id: string) => {
  const response = await axiosInstance.get(`/news/${id}`);
  return response.data;
};

// Crear nueva noticia
export const createNews = async (payload: any) => {
  const response = await axiosInstance.post(`/news`, payload);
  return response.data;
};

// Actualizar noticia
export const updateNews = async (id: string, payload: any) => {
  const response = await axiosInstance.put(`/news/${id}`, payload);
  return response.data;
};

// Eliminar noticia
export const deleteNews = async (id: string) => {
  const response = await axiosInstance.delete(`/news/${id}`);
  return response.data;
};
