import axiosInstance from "@/services/axiosInstance";

// Funcion para obtener todas las noticias
export const fetchNews = async ({
  status = 1,
  publish_status,
  page,
  pageSize,
  search = '',
  subordinates = 'all',
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
    search,
    _page: page,
    _limit: pageSize,
    subordinates,
  };

  if (publish_status !== undefined) {
    params.publish_status = publish_status;
  }

  const response = await axiosInstance.get('/news', { params });

  const filteredNews = response.data.map((news: any) => ({
    key: news.id,
    title: news.title,
    author: news.author,
    start: news.start,
    end: news.end,
    status: news.publish_status,
    stats: news.read && Array.isArray(news.read)
      ? new Set(news.read.map((readEntry: any) => readEntry.actor__code)).size
      : 0,
  }));

  return {
    results: filteredNews,
    total: Number(response.headers['x-total-count']) || filteredNews.length,
    currentPage: page,
    pageSize: pageSize,
  };
};



// Funcion para obtener los contadores de las noticias

export const fetchNewsCounters = async ({
  status = 1,
  subordinates = 'all'
}: {
  status?: number;
  subordinates?: string;
}) => {
  // Obtenemos todas las noticias con un pageSize muy alto para traerlas todas
  const { results } = await fetchNews({
    status: status || 1,
    page: 1,
    pageSize: 1000, // o un número que asegure traer todas
    subordinates: subordinates || 'all',
    search: ''
  });

  // Creamos contadores simples como ejemplo
  const published = results.filter((n: { status: number; }) => n.status === 1).length;
  const draft = results.filter((n: { status: number; }) => n.status === 0).length;
  const scheduled = results.filter((n: { status: number; }) => n.status === 2).length;

  return {
    total: results.length,
    published,
    draft,
    scheduled,
  };
};



//Funcion para obtener la informacion de una noticia
export const fetchSingleNews = async (id: string) => {
  const response = await axiosInstance.get(`/news/${id}`);
  return response.data;
};


// Funcion para realizar una prueba de asignacion
// export const testAssignment = async (payload: any) => {
//   const response = await axiosInstance.post('/api/v1/employees/test_kql/', payload);
//   return response.data;
// };

// Funcion para actualizar una noticia
export const updateNews = async (id: string, payload: any) => {
  const response = await axiosInstance.put(`/news/${id}`, payload);
  return response.data;
};

// Funcion para eliminar una noticia
export const deleteNews = async (id: string) => {
  const response = await axiosInstance.delete(`/news/${id}`);
  return response;
};


// Funcion para crear noticia
export const createNews = async (payload: any) => {
  const response = await axiosInstance.post(`/news`, payload);
  return response;
};
