'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadValidation } from '@/validation/upload-image'
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from '@/components/ui/form'
import FileInput from '@/components/form/file-input'
import { blobToFile } from '@/lib/utils'
import { uploadImage } from '@/api/external/upload-image'
import adValidation from '@/validation/advertise'

import * as z from 'zod'
import RegisterForm from '@/components/form/register-form'
import ImageUploadButton from '@/components/image-upload'
import AdUploadForm from '@/components/ad-form'

const RegisterPage = () => {
  const form = useForm<z.infer<(typeof adValidation)['POST']>>({
    resolver: zodResolver(adValidation['POST']),
  })

  // url 들어있음
  const onValid = async (data: z.infer<(typeof uploadValidation)['POST']>) => {
    const res = await uploadImage(blobToFile(data.image))
    console.log(res)
  }

  const isLoading = form.formState.isSubmitting

  return (
    <div className="p-8 px-10">
      <h1 className="text-LargeTitle mb-[32px]">Register</h1>
      <div className="flex items-center justify-between">
        <AdUploadForm />
      </div>
    </div>
  )
}

export default RegisterPage
