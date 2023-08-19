import { AdArea, TimeZone } from '@/models/Ad'
import * as z from 'zod'
import uploadValidation from './upload-image'

export const adValidation = {
  POST: z
    .object({
      line: z.string({
        required_error: 'Line is required.',
      }),
      title: z
        .string({
          required_error: 'Title is required.',
        })
        .min(1, {
          message: 'Title is required.',
        }),
      timezone: z.enum(
        [TimeZone.DINNER_RUSH, TimeZone.MIDTIME, TimeZone.MORNING_RUSH],
        {
          required_error: 'Timezone is required.',
        }
      ),
      adArea: z.enum(
        [AdArea.DOORSIDELEFT, AdArea.DOORSIDERIGHT, AdArea.UPPERSIDE],
        {
          required_error: 'adArea is required.',
        }
      ),
      // image: uploadValidation.POST,
    })
    .merge(uploadValidation.POST),
}

export type AdValidation<T extends keyof typeof adValidation> = z.infer<
  (typeof adValidation)[T]
>

export default adValidation
