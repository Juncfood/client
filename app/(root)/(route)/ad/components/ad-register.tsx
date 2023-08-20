'use client'
import { AdvertiseApi } from '@/api/advertise'
import instance from '@/api/instance'
import { SubwayApi } from '@/api/subway'
import FileInput from '@/components/form/file-input'
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
import { Ad, AdArea, TimeZone } from '@/models/Ad'
import adValidation from '@/validation/ad-vaildation'
import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useMemo, useState } from 'react'
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
  ad?: Ad
}

const AdRegister = ({ ad }: AdRegisterProps) => {
  const { data: lines } = useQuery(SubwayApi.queries.getLines)
  const queryClient = useQueryClient()
  const [adList, setAdList] = useState<Ad[]>([])
  const form = useForm<AdPostType>({
    resolver: zodResolver(adValidation['POST']),
    defaultValues: {
      adId: ad?.id,
      image: {
        url: ad?.imageUrl,
      },
      landingUrl: ad?.landingUrl,
      timezone: ad?.timeZone,
      title: ad?.title,
      line: ad?.lineId,
    },
    mode: 'onChange',
  })

  const { toast } = useToast()
  const router = useRouter()
  const { mutate, isLoading } = useMutation({
    ...AdvertiseApi.mutations.reditAds,
    onSuccess(data) {
      toast({
        type: 'foreground',
        title: 'DONE',
        duration: 1500,
      })
      queryClient.clear()
      router.refresh()
      router.push('/')
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

  const updateAdList = async (lineId: string, timeZone: string) => {
    const res = await instance.get<Ad[]>(`/ad`, {
      params: {
        lineId,
        timeZone,
      },
    })
    setAdList(res.data)
  }

  const timeZone = form.watch('timezone')
  const line = form.watch('line')

  const {
    image: { url: previewUrl },
    title,
    adId,
  } = form.getValues()
  const selectedAdArea = useMemo(
    () => adList.find((i) => i.id === adId),
    [adId, adList]
  )

  useEffect(() => {
    if (line && timeZone) {
      updateAdList(line, timeZone)
    }
  }, [form, line, previewUrl, timeZone])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid)}
          className="grid grid-cols-[20%_1fr] items-center gap-y-6"
        >
          <Label>
            <h3 className="text-Title1">Line</h3>
          </Label>
          <FormField
            control={form.control}
            name="line"
            render={({ field }) => (
              <FormItem>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <Label>
            <h3 className="text-Title1">Title</h3>
          </Label>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem defaultValue={field.value}>
                <Input
                  {...field}
                  disabled={isLoading}
                  type="text"
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />
          <Label>
            <h3 className="text-Title1">Timezone</h3>
            <p className="text-Body1 text-gray-300">(Select 1)</p>
          </Label>
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <RadioGroup
                disabled={isLoading}
                className="flex justify-between py-4"
                defaultValue={field.value}
              >
                {Object.entries(timeType).map((timeKey) => (
                  <FormItem key={timeKey[0]} {...field}>
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
          {adList.length ? (
            <>
              <Label className="text-Title1">Ad Area</Label>
              <FormField
                control={form.control}
                name="adId"
                render={({ field }) => {
                  return (
                    <Select
                      defaultValue={field.value}
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="?palceholer"
                          defaultValue={adList[0].type}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {adList
                          ?.filter((item) =>
                            ad
                              ? item.occupied
                              : !item.occupied && !item.preoccupied
                          )
                          .map((ad) => (
                            <SelectItem key={ad.id} value={ad.id}>
                              {areaType[ad.type].name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )
                }}
              />
            </>
          ) : null}
          <Label>Landing Url</Label>
          <FormField
            control={form.control}
            name="landingUrl"
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  disabled={isLoading}
                  type="text"
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />
          <Label></Label>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FileInput
                defaultValue={field.value}
                disabled={isLoading}
                className="aspect-[524/372]  w-2/3 bg-blue-300 flex flex-col justify-center items-center"
                onBlobChange={(blob) => field.onChange(blob)}
              >
                <div>
                  <Image
                    src="/registerImg.svg"
                    width={40}
                    height={40}
                    alt="register your img"
                  />
                </div>
                <div className="text-white text-sm mt-[8px]">Select Image</div>
              </FileInput>
            )}
          />
          <h3 className="text-Title1 mb-6">Preview</h3>
        </form>
      </Form>
      <div className="relative w-full aspect-[16/9]">
        <Image
          src="/preview.svg"
          // width={960}
          // height={600}
          fill
          alt="register your img"
        />
        {previewUrl && selectedAdArea?.type && (
          <div
            className={cn(
              'absolute w-full h-full outline-2 border-2 border-white'
            )}
          >
            <img
              src={previewUrl}
              className={cn(
                'absolute z-50 sm:block outline-2 border-2 border-white',
                selectedAdArea?.type === AdArea.UPPERSIDE
                  ? 'left-[6.8%] top-[15%] w-[33.7%] h-[14%]'
                  : selectedAdArea?.type === AdArea.DOORSIDERIGHT
                  ? 'w-[13%] h-[17%] left-[27%] height-[18%] width-[14%] top-[35%]'
                  : 'w-[13%] h-[17%] left-[27%] height-[18%] width-[16%] top-[35%]'
              )}
              alt={title || ''}
            />
          </div>
        )}
      </div>
      {/* <Image src={previewUrl}  width={150}, height={150} alt='프로필 이미지 입니다.' /> */}
      <Button className="bg-inverse w-full col-span-2 py-6 mt-16">SAVE</Button>
    </>
  )
}

export default AdRegister
