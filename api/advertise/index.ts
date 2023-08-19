import instance, { QueryType } from '@/api/instance'
import { Ad } from '@/models/Ad'

export const AdvertiseApi = {
  queries: {
    getAdsByLineId(id: string) {
      return {
        queryKey: ['get-ads-by-line-id', id],
        queryFn: async ({ queryKey }) => {
          const res = await instance.get<Ad[]>(`/ad/line/${queryKey[1]}`)
          return res.data
        },
      } as QueryType<Ad[]>
    },
  },
}
