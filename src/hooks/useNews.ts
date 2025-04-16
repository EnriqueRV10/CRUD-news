import { useQuery } from '@tanstack/react-query';
import api  from '@/lib/axios';

export interface ReadEntry {
  user: string;
  views: number;
  last_visited: string;
}

export interface NewsItem {
  id: number;
  title: string;
  body: string;
  start_date: string;
  end_date: string;
  author: string;
  status: 'published' | 'preview' | 'draft';
  read: ReadEntry[];
}

export const useNews = () => {
  return useQuery<NewsItem[]>({
    queryKey: ['news'],
    queryFn: async () => {
      const { data } = await api.get('/news');
      return data;
    },
  });
};
