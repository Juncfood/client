import instance from '@/api/instance'
import { QueryKey, UseQueryOptions } from '@tanstack/react-query'
export const SubwayApi = {
  queries: {
    getAdsByLineId(id: string) {
      return {
        queryKey: ['get-ads-by-line-id', id],
        queryFn: async ({ queryKey }) => {
          const res = await instance.get(`/ad/line/${queryKey}`)
          return res.data
        },
      } as UseQueryOptions<unknown, unknown, any, string[]>
    },
  },
}
