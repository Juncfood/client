import * as z from 'zod'
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const uploadValidation = {
  POST: z.object({
    image: z.object(
      {
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
      },
      {
        required_error: 'image is required.',
      }
    ),
  }),
}
export type Validation<T extends keyof typeof uploadValidation> = z.infer<
  (typeof uploadValidation)[T]
>
export default uploadValidation
