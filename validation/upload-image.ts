import * as z from 'zod'
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export const uploadValidation = {
  POST: z.object({
    image: z.object({
      name: z.string({
        required_error: 'image is required.',
      }),
      size: z.number({
        required_error: 'image is required.',
      }),
      type: z.string({
        required_error: 'image is required.',
      }),
      url: z.string({
        required_error: 'image is required.',
      }),
      line: z.string().min(1, {
        message: 'Line is required.',
      }),
      title: z.string().min(1, {
        message: 'Title is required.',
      }),
      // FIXME
      timezone: z.string().min(1, {
        message: 'Timezone is required',
      }),
      // FIXME
      adArea: z.string().min(1, {
        message: 'adArea is required',
      }),
    }),
  }),
}
export type Validation<T extends keyof typeof uploadValidation> = z.infer<
  (typeof uploadValidation)[T]
>
export default uploadValidation
