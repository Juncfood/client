'use client'

import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import adValidation from '@/validation/advertise'

import { useToast } from '@/components/ui/use-toast'

import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ImageUploadButton from '../image-upload'

const RegisterForm = () => {
  return (
    <div className="w-[524px] h-[372px] bg-slate-400">
      <ImageUploadButton />
    </div>
  )
}

export default RegisterForm
