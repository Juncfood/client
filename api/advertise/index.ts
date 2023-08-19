import instance, { QueryType } from '@/api/instance'
import { Ad, TimeZone } from '@/models/Ad'
import { AdValidation } from '@/validation/ad-vaildation'
import { MutationOptions } from '@tanstack/react-query'
import { uploadImage } from '../external/upload-image'
import { blobToFile } from '@/lib/utils'

export const AdvertiseApi = {
  mutations: {
    reditAds: {
      mutationKey: ['update-ad'],
      mutationFn: async (param) => {
        const { adArea, image, line, timezone, title } = param
        const { secure_url: imageUrl } = await uploadImage(blobToFile(image))
        const body = {
          title,
          imageUrl,
        }
        const res = await instance.post('/ad/register', body)
        return res.data
      },
    } as MutationOptions<any, any, AdValidation<'POST'>>,
  },
  queries: {
    getAdsByLineId(id: string, timeZone?: TimeZone) {
      const queryKey = ['get-ads-by-line-id', id, timeZone].filter(
        (item) => item !== undefined
      )
      console.log(queryKey)
      return {
        queryKey,
        queryFn: async ({ queryKey }) => {
          const res = await instance.get<Ad[]>(`/ad`, {
            params: {
              lineId: queryKey[1],
              ...((queryKey[2] && { timeZone: queryKey[2] }) || {}),
            },
          })
          return res.data
        },
      } as QueryType<Ad[]>
    },
  },
}
