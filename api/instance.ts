import { UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'

export default axios.create({ baseURL: process.env.NEXT_PLUBIC_SERVER_URL })

export type QueryType<T> = UseQueryOptions<T, unknown, T, string[]>
