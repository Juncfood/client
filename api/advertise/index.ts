import instance, { QueryType } from '@/api/instance'
import { Ad } from '@/models/Ad'

export const AdvertiseApi = {
  queries: {
    getAdsByLineId(id: string) {
      return {
        queryKey: ['get-ads-by-line-id', id],
        queryFn: async ({ queryKey }) => {
          const res = await instance.get<Ad[]>(`/ad/line/${queryKey}`)
          return res.data
        },
      } satisfies QueryType<Ad[]>
    },
  },
}
