'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadValidation } from '@/validation/upload-image'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import FileInput from './form/file-input'
import { blobToFile } from '@/lib/utils'
import { uploadImage } from '@/api/external/upload-image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import * as z from 'zod'

interface ImageUploadProps {
  disabled?: boolean
}

const ImageUploadButton = ({ disabled }: ImageUploadProps) => {
  const form = useForm<z.infer<(typeof uploadValidation)['POST']>>({
    resolver: zodResolver(uploadValidation['POST']),
  })

  const onValid = async (data: z.infer<(typeof uploadValidation)['POST']>) => {
    const res = await uploadImage(blobToFile(data.image))
    console.log(res)
  }
  const isLoading = form.formState.isSubmitting

  const lines = [{ name: '1호선' }, { name: '2호선' }, { name: '3호선' }]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValid)}>
        {/* <p className="text-extraBold">1</p> */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileInput
                  onBlobChange={(blob) => {
                    field.onChange(blob)
                  }}
                >
                  <div className="w-[524px] h-[372px] bg-slate-400 rounded-[10px] flex justify-center items-center">
                    <p className="text-LargeTitle text-white ">+</p>
                  </div>
                </FileInput>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="image.line"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Line</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a Line"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lines.map((line) => (
                    <SelectItem key={line.name} value={line.name}>
                      {line.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <button
          className="w-[1000px] h-[64px] bg-slate-900 rounded-[8px] text-white"
          type="submit"
        >
          Save
        </button>
      </form>
    </Form>
  )
}

export default ImageUploadButton
