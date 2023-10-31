import { map } from 'lodash-es';
import useSWR from 'swr';

export default function useTMDBTrendingAll(params: Record<string, any> = {}, isInitLoad = true) {
  const { data: response = {} } = useSWR(
    isInitLoad
      ? {
          url: '/api/v1/public/tmdb/trending/all',
          params,
        }
      : null,
  );

  const { data = {}, meta = {} } = response;

  const { results = [] } = data;

  return {
    data: map(results, (item) => ({
      ...item,
      backdropUrl: `${meta.image_base_url}/w780${item.backdrop_path}`,
      posterUrl: `${meta.image_base_url}/w342${item.poster_path}`,
    })),
  };
}
