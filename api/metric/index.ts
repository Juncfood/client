import instance, { QueryType } from '@/api/instance'
import { Ad } from '@/models/Ad'
import { QRCodeCTR } from '@/models/QRCodeCTR'

export const MetricApi = {
  queries: {
    getQRCodeCTR(id: string) {
      return {
        queryKey: ['QR-Code-CTR', id],
        queryFn: async ({ queryKey }) => {
          const response = await instance.get<QRCodeCTR[]>(
            `/ad/performance/${queryKey[1]}`
          )
          return response.data
        },
      } satisfies QueryType<QRCodeCTR[]>
    },
    getOccupied: {
      queryKey: ['get-occupied'],
      queryFn: async () => {
        const response = await instance.get<Ad[]>('/ad/occupied')
        return response.data
      },
    },
  },
}
