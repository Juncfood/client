import { UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'
const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL })
export default instance

export type QueryType<T> = UseQueryOptions<T, unknown, T, readonly string[]>
