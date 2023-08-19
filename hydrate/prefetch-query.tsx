import getQueryClient from '@/app/getQueryClient'
import {
  Hydrate,
  QueryKey,
  UseQueryOptions,
  dehydrate,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

interface HydrateQueryProps {
  queries: UseQueryOptions<unknown, unknown, any, QueryKey>[]
}

const PrefetchQuery = async ({
  children,
  queries,
}: PropsWithChildren<HydrateQueryProps>) => {
  const queryClient = getQueryClient()
  const queriesList = queries.map((query) => queryClient.prefetchQuery(query))
  await Promise.allSettled(queriesList)
  const dehydratedState = dehydrate(queryClient)
  return <Hydrate state={dehydratedState}>{children}</Hydrate>
}

export default PrefetchQuery
