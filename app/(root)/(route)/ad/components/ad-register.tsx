'use client'
import { AdvertiseApi } from '@/api/advertise'
import { uploadImage } from '@/api/external/upload-image'
import { SubwayApi } from '@/api/subway'
import FileInput from '@/components/form/file-input'
import ImageUploadButton from '@/components/image-upload'
import Timezone from '@/components/timezone'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { blobToFile } from '@/lib/utils'
import { AdArea, TimeZone } from '@/models/Ad'
import adValidation from '@/validation/ad-vaildation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const timeType = { ...TimeZone }
const areaType: { [key in AdArea]: { name: string; value: AdArea } } = {
  DOORSIDELEFT: {
    name: 'Doorside #1',
    value: AdArea.DOORSIDELEFT,
  },
  DOORSIDERIGHT: {
    name: 'Doorside #2',
    value: AdArea.DOORSIDERIGHT,
  },
  UPPERSIDE: {
    name: 'Upperside',
    value: AdArea.UPPERSIDE,
  },
}
type AdPostType = z.infer<(typeof adValidation)['POST']>

interface AdRegisterProps {
  ad?: AdPostType
}

const AdRegister = ({ ad }: AdRegisterProps) => {
  const { data: lines } = useQuery(SubwayApi.queries.getLines)
  const { mutate } = useMutation({
    ...AdvertiseApi.mutations.reditAds,
    onSuccess(data, variables, context) {
      console.log(data)
    },
  })
  const { toast } = useToast()
  const form = useForm<AdPostType>({
    resolver: zodResolver(adValidation['POST']),
    defaultValues: {
      ...ad,
    },
  })

  const onValid = async (data: AdPostType) => {
    mutate(data)
  }

  useEffect(() => {
    const error = Object.entries(form.formState.errors)
    if (error.length) {
      toast({
        title: 'Error',
        description: error[0][1].message,
        duration: 3000,
      })
    }
  }, [form.formState.errors, toast])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="grid grid-cols-[20%_1fr] items-center gap-y-12"
      >
        <Label>Line</Label>
        <FormField
          control={form.control}
          name="line"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {lines?.map((line) => (
                    <SelectItem key={line.id} value={line.id}>
                      {line.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Label>Title</Label>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Input type="text" onChange={field.onChange} />
            </FormItem>
          )}
        />
        <Label>
          <h3>Timezone</h3>
          <p>(select 1)</p>
        </Label>
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <RadioGroup className="flex justify-between">
              {Object.entries(timeType).map((timeKey) => (
                <FormItem key={timeKey[0]}>
                  <FormControl>
                    <Timezone
                      selected={field.value === timeKey[1]}
                      timeType={timeKey[1]}
                      onChange={(timezone) => field.onChange(timezone)}
                    />
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          )}
        />
        <Label>Ad Area</Label>
        <FormField
          control={form.control}
          name="adArea"
          render={({ field }) => {
            const adList = Object.entries(areaType)
            return (
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue
                    placeholder="?palceholer"
                    defaultValue={adList[0][1].value}
                  />
                </SelectTrigger>
                <SelectContent>
                  {adList?.map((ad) => (
                    <SelectItem key={ad[1].value} value={ad[1].value}>
                      {ad[1].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          }}
        />
        <Label></Label>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FileInput
              className="aspect-[524/372]  w-2/3 bg-blue-300"
              onBlobChange={(blob) => field.onChange(blob)}
            >
              <div>??</div>
            </FileInput>
          )}
        />

        <Button className="bg-inverse w-full col-span-2">SAVE</Button>
      </form>
    </Form>
  )
}

export default AdRegister
