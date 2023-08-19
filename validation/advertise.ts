import * as z from 'zod'
export const advertiseValidation = {
  REGISTER: z.object({
    호선: z.string({
      required_error: '호선정보가 없어요.',
    }),
    title: z.string({
      required_error: '제목을 입력해주세요.',
    }),
    labelId: z.string({
      required_error: '??',
    }),
  }),
}
export type Validation<T extends keyof typeof advertiseValidation> = z.infer<
  (typeof advertiseValidation)[T]
>
