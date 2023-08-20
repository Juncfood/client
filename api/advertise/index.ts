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
        const { adId, image, line, timezone, title, landingUrl } = param
        const { type, url, name = '', size } = image
        let imageUrl
        if (url && !type && !name) imageUrl = url
        else {
          //@ts-ignore
          const { secure_url } = await uploadImage(blobToFile(image))
          imageUrl = secure_url
        }
        const body = {
          adId,
          title,
          imageUrl,
          landingUrl,
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
      return {
        queryKey,
        queryFn: async () => {
          if (!queryKey[1]) return []
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
