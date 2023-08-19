import instance from '@/api/instance'
import { QueryKey, UseQueryOptions } from '@tanstack/react-query'
export const SubwayApi = {
  queries: {
    getLines: {
      queryKey: ['all-line'],
      queryFn: async () => {
        const response = await instance.get('/line/all')
        return response.data
      },
    } as UseQueryOptions<unknown, unknown, any, QueryKey>,
  },
}
