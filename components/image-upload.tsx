'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadValidation } from '@/validation/upload-image'

import * as z from 'zod'

const imageUploader = async (file: File) => {
  // FormData 생성
  const data = new FormData()

  // FormData 에 file, upload_preset 추가
  data.append('file', file)
  data.append('upload_preset', 'aczqdt1o')

  // .env 파일에 있는 cloudName 가져오기
  const cloudName = 'dzfrlb2nb'

  // body에 FormData 객체를 넣어 전송
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload/c_scale,w_80`,
    {
      method: 'POST',
      body: data,
    }
  )

  // fetch로 받아온 값은 .json() 메서드를 이용해야 사용 가능. 프로미스 반환
  return res.json()
}

const ImageUploadButton = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof uploadValidation>>({
    resolver: zodResolver(uploadValidation),
  })

  const onValid = async (data: z.infer<typeof uploadValidation>) => {
    const image = data.image[0]
    console.log(image)
    const res = await imageUploader(image)
    console.log(res)
  }
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input type="file" accept="image/*" {...register('image')} />
      <button type="submit">submit</button>
    </form>
  )
}

export default ImageUploadButton
