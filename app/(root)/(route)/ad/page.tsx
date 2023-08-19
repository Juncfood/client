import { Fragment } from 'react'
import AdRegister from './components/ad-register'
import { Ad, TimeZone } from '@/models/Ad'
import instance from '@/api/instance'
import PrefetchQuery from '@/hydrate/prefetch-query'
import { AdvertiseApi } from '@/api/advertise'

const RegisterPage = async ({
  searchParams,
}: {
  searchParams?: { lineId: string; timeZone: TimeZone }
}) => {
  const { lineId, timeZone } = searchParams || {}
  const isEdit = lineId && timeZone
  return (
    <Fragment>
      <PrefetchQuery
        queries={
          lineId ? [AdvertiseApi.queries.getAdsByLineId(lineId, timeZone)] : []
        }
      >
        <h1 className="text-title font-bold">{isEdit ? 'Edit' : 'Register'}</h1>

        <AdRegister />
      </PrefetchQuery>
    </Fragment>
  )
}

export default RegisterPage
