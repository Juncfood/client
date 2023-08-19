'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadValidation } from '@/validation/upload-image'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import FileInput from './form/file-input'
import { blobToFile } from '@/lib/utils'
import { uploadImage } from '@/api/external/upload-image'

import * as z from 'zod'

const RegisterSaveButton = () => {
  // const form = useForm<z.infer<(typeof )>>
}
