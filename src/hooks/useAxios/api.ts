import { useState } from 'react'

import axios, { CancelTokenSource } from 'axios'

import type { UseAxiosService, UseAxiosOptions, UseAxiosState, UseAxiosInstance } from './types'

const CancelToken = axios.CancelToken

const never: Promise<never> = new Promise(() => void 0)

/**
 * 使用 axios 封装的 hooks 函数
 *
 * @todo 支持自定义 axios 实例
 * @todo service 支持传递 AxiosRequestConfig
 *
 * @param service 后台服务
 * @param options 可选配置
 */
export function useAxios<T extends object = any, U = any, S extends UseAxiosService<T, U> = any>(
  service: S,
  options: UseAxiosOptions = {},
): UseAxiosInstance<T, U> {
  let cancelSource: CancelTokenSource | null = null

  const unique = options.unique !== true
  const silent = options.silent !== false

  const [state, setState] = useState<UseAxiosState<T>>({
    loading: false,
    data: null,
    error: null,
  })

  const onSuccess = (data: T) => {
    setState({ data, loading: false, error: null })
    return data
  }

  const onError = (error: Error): Promise<never> => {
    setState({ data: null, loading: false, error })
    return silent ? never : Promise.reject(error)
  }

  const run = (args: U): Promise<T> => {
    if (unique) cancel()

    const source = CancelToken.source()
    cancelSource = source

    setState({ data: null, loading: true, error: null })
    return service(args, { cancelToken: source.token }).then(onSuccess, onError)
  }

  const cancel = (message?: string) => {
    if (cancelSource) {
      cancelSource.cancel(message)
      cancelSource = null
    }
  }

  /** 数据转换  */
  function toJSON(): UseAxiosState<T> {
    return state
  }

  return {
    ...state,
    run,
    cancel,
    toJSON,
  }
}
