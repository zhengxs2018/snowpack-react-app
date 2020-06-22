import axios, { AxiosRequestConfig } from 'axios'

const hasOwn = Object.prototype.hasOwnProperty

const http = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ResponseResult<T> {
  code: number
  message: string
  data: T
}

export async function fetch<T = unknown>(
  url: string,
  options?: Omit<AxiosRequestConfig, 'url' | 'transformResponse'>,
): Promise<T> {
  const response = await http.request<ResponseResult<T>>({ ...options, url })
  const result = response.data
  if (typeof result === 'string') return result
  if (hasOwn.call(result, 'code')) {
    return result.code === 200 ? result.data : Promise.reject(Error(result.message ?? 'unknown error.'))
  }
  return Promise.reject(Error('unknown error.'))
}

export default http
