import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'

import { useRef, useState } from 'react'

import { fetch } from 'src/lib/http'

const { CancelToken, isCancel } = axios

export interface UseRequestOptions<T> extends Omit<AxiosRequestConfig, 'url'> {
  initialState?: T | (() => T)
}

export interface UseRequestState<T> {
  data: T
  loading: boolean
  error: boolean
  message: string | null

  run(config?: Omit<AxiosRequestConfig, 'url'> | ((config: AxiosRequestConfig) => AxiosRequestConfig)): Promise<void>
  cancel(msg?: string): void
}

type Refs = {
  request: Promise<any> | null
  source: CancelTokenSource | null
}

/** 请求钩子
 *
 * @param url       请求地址
 * @param options   可选参数
 */
export function useRequest<T>(url: string, options?: UseRequestOptions<T>): UseRequestState<T> {
  const { initialState, ...defaultConfig } = options || {}

  const getState = typeof initialState === 'function' ? (initialState as () => T) : () => initialState as T

  const [state, setState] = useState(() => ({
    data: getState(),
    loading: false,
    error: false,
    message: null,
  }))

  const refs = useRef<Refs>({
    source: null,
    request: null,
  })

  const run = async (
    config?: Omit<AxiosRequestConfig, 'url'> | ((config: AxiosRequestConfig) => AxiosRequestConfig),
  ) => {
    try {
      // 保留 CancelToken
      const source = CancelToken.source()
      refs.current.source = source

      setState((state) => ({ ...state, loading: true, error: false, message: null }))

      // 支持动态修改参数
      const settings = typeof config === 'function' ? config(defaultConfig || {}) : { ...defaultConfig, ...config }

      // 保留请求
      const request = fetch<T>(url, { ...settings, cancelToken: source.token })
      refs.current.request = request

      // 等待请求完成
      const data = await request
      setState((state) => ({ ...state, loading: false, data: data }))
    } catch (e) {
      if (state.loading == false) return
      if (isCancel(e)) {
        setState((state) => ({ ...state, loading: false }))
      } else {
        setState((state) => ({ ...state, error: true, message: e.message, loading: false }))
        if (import.meta.env.NODE_ENV === 'development') console.error(e)
      }
    } finally {
      refs.current.source = null
      refs.current.request = null
    }
  }

  const cancel = (msg?: string) => {
    refs.current?.source?.cancel(msg ?? 'abort request.')
    refs.current.source = null
    refs.current.request = null
  }

  return { ...state, cancel, run }
}
