import getQueryClient from '@/app/getQueryClient'
import {
  Hydrate,
  QueryKey,
  UseQueryOptions,
  dehydrate,
} from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface HydrateQueryProps<T> {
  queries: T[]
}

const PrefetchQuery = async <T,>({
  children,
  queries,
}: PropsWithChildren<HydrateQueryProps<T>>) => {
  try {
    const queryClient = getQueryClient()
    // @ts-ignore
    const queriesList = queries.map((query) => queryClient.prefetchQuery(query))
    await Promise.all(queriesList)
    const dehydratedState = dehydrate(queryClient)
    return <Hydrate state={dehydratedState}>{children}</Hydrate>
  } catch (error) {
    return redirect('/')
  }
}

export default PrefetchQuery
