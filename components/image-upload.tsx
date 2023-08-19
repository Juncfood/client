'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadValidation } from '@/validation/upload-image'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import FileInput from './form/file-input'
import { blobToFile } from '@/lib/utils'
import { uploadImage } from '@/api/external/upload-image'

import * as z from 'zod'

const ImageUploadButton = () => {
  const form = useForm<z.infer<(typeof uploadValidation)['POST']>>({
    resolver: zodResolver(uploadValidation['POST']),
  })

  const onValid = async (data: z.infer<(typeof uploadValidation)['POST']>) => {
    const res = await uploadImage(blobToFile(data.image))
    console.log(res)
  }

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
                  <div>click here !</div>
                </FileInput>
              </FormControl>
            </FormItem>
          )}
        />
        <button type="submit">submit</button>
      </form>
    </Form>
  )
}

export default ImageUploadButton
