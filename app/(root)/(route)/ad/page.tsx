import { Fragment } from 'react'
import AdRegister from './components/ad-register'
import { Ad, TimeZone } from '@/models/Ad'
import instance from '@/api/instance'
import PrefetchQuery from '@/hydrate/prefetch-query'
import { AdvertiseApi } from '@/api/advertise'

export const dynamic = 'force-dynamic'

const getEditableAd = async (lineId: string, timeZone: string) => {
  const res = await instance.get<Ad[]>(`/ad`, {
    params: {
      lineId,
      timeZone,
    },
  })
  return res.data
}

const RegisterPage = async ({
  searchParams,
}: {
  searchParams?: { lineId: string; timeZone: TimeZone }
}) => {
  const { lineId, timeZone } = searchParams || {}
  const isEdit = lineId && timeZone

  const ad = isEdit
    ? (await getEditableAd(lineId, timeZone)).find((item) => !!item.occupied)
    : undefined

  return (
    <Fragment>
      <PrefetchQuery
        queries={
          lineId ? [AdvertiseApi.queries.getAdsByLineId(lineId, timeZone)] : []
        }
      >
        <h1 className="text-LargeTitle mb-[32px]">
          {isEdit ? 'Edit' : 'Register'}
        </h1>

        <AdRegister ad={ad} />
      </PrefetchQuery>
    </Fragment>
  )
}

export default RegisterPage
