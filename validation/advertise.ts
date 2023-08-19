import * as z from 'zod'

export const adValidation = {
  POST: z.object({
    line: z.string().min(1, {
      message: 'Line is required.',
    }),
    title: z.string().min(1, {
      message: 'Title is required.',
    }),
    labelId: z.string().min(1, {
      message: 'Label ID is required.',
    }),
    // FIXME
    timezone: z.string().min(1, {
      message: 'Timezone is required',
    }),
  }),
}

export type AdValidation<T extends keyof typeof adValidation> = z.infer<
  (typeof adValidation)[T]
>

export default adValidation
