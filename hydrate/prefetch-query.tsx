import getQueryClient from '@/app/getQueryClient'
import {
  Hydrate,
  QueryKey,
  UseQueryOptions,
  dehydrate,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

interface HydrateQueryProps<T> {
  queries: T[]
}

const PrefetchQuery = async <T,>({
  children,
  queries,
}: PropsWithChildren<HydrateQueryProps<T>>) => {
  const queryClient = getQueryClient()
  // @ts-ignore
  const queriesList = queries.map((query) => queryClient.prefetchQuery(query))
  await Promise.allSettled(queriesList)
  const dehydratedState = dehydrate(queryClient)
  return <Hydrate state={dehydratedState}>{children}</Hydrate>
}

export default PrefetchQuery
