import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          staleTime: Infinity,
        },
      },
    })
)
export default getQueryClient
