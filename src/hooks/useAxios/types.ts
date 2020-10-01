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

export interface UseAxiosInstance<T, P> {
  data: T | null
  loading: boolean
  error: Error | null

  run(args: P): Promise<T>
  cancel(message?: string): void
  toJSON(): UseAxiosState<T>
}

export type UseAxiosService<T, U> = (args: U, options: AxiosRequestConfig) => Promise<T>

// 不能删除，否则 snowpack 会运行报错
export default {}
