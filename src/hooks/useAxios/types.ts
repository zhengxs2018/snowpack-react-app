import type { AxiosRequestConfig } from 'axios'

export interface UseAxiosState<T> {
  loading: boolean
  data: T | null
  error: Error | null
}

export interface UseAxiosOptions {
  unique?: boolean
  silent?: boolean
}

export interface UseAxiosInstance<T, P> extends UseAxiosState<T> {
  run(args: P): Promise<T>
  cancel(message?: string): void
}

export type UseAxiosService<T, U> = (args: U, options: AxiosRequestConfig) => Promise<T>

export default {}
