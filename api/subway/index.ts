import instance, { QueryType } from '@/api/instance'
import { Line } from '@/models/Ad'
export const SubwayApi = {
  queries: {
    getLines: {
      queryKey: ['all-line'],
      queryFn: async () => {
        const response = await instance.get<Line[]>('/line/all')
        return response.data
      },
    } satisfies QueryType<Line[]>,
  },
}
