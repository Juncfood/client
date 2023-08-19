'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadValidation } from '@/validation/upload-image'
import { Form } from '@/components/ui/form'
import FileInput from '@/components/form/file-input'
import { blobToFile } from '@/lib/utils'
import { uploadImage } from '@/api/external/upload-image'

import * as z from 'zod'

const RegisterPage = () => {
  return (
    <div className="p-8 px-10">
      <h1 className="text-LargeTitle">Register</h1>
      <div className="flex items-center justify-between">form 시작</div>
    </div>
  )
}

export default RegisterPage
