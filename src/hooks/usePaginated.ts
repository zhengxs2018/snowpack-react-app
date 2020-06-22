import type { AxiosRequestConfig } from 'axios'

import { useState, useEffect, useMemo } from 'react'
import { useRequest, UseRequestState } from './useRequest'

/** 分页列表数据 */
export interface RequestListData<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
}

export interface UsePaginatedOptions<T> extends RequestListData<T> {
  filters: Record<string, any>
  append: boolean
}

/** 分页请求状态 */
export interface UsePaginatedState<T> extends RequestListData<T> {
  loading: boolean
  pageCount: number
  end: boolean
  error: boolean
  message: string | null
  // 刷新列表
  refresh(): void | Promise<void>
  // 加载指定页数据
  loadPageData(page: number): void | Promise<void>
  loadPrevPageData(): void | Promise<void>
  // 加载下一页数据
  loadNextPageData(): void | Promise<void>
  // 取消请求
  cancel: UseRequestState<T>['cancel']
}

/** 分页 hook
 *
 * @param url       请求地址
 * @param options   可选参数
 */
export function usePaginated<T>(
  url: string,
  config: Omit<AxiosRequestConfig, 'url'> = {},
): (options?: Partial<UsePaginatedOptions<T>>) => UsePaginatedState<T> {
  return (options?: Partial<UsePaginatedOptions<T>>) => {
    const append = options?.append ?? false
    const filters = options?.filters ?? {}
    const initialState = () => ({
      items: options?.items ?? [],
      page: options?.page ?? 1,
      pageSize: options?.pageSize ?? 10,
      total: options?.total ?? 0,
    })

    const [state, setState] = useState(initialState)

    const extra = useMemo(() => {
      const pageCount = Math.ceil(state.total / state.pageSize)
      return { pageCount, end: state.page >= pageCount }
    }, [state])

    const request = useRequest<RequestListData<T>>(url, { ...config, initialState: state })

    const httpRequest = () => {
      const { page, pageSize } = state
      request.run((config) => {
        config.params = Object.assign({}, config.params, filters, { page, pageSize })
        return config
      })
    }

    const refresh = () => {
      setState((state) => ({
        items: [],
        page: 1,
        pageSize: state.pageSize,
        total: 0,
      }))
      httpRequest()
    }

    const loadPageData = (page: number) => {
      setState((state) => ({ ...state, page: page }))
    }

    const loadPrevPageData = () => {
      if (state.page === 1) return
      return loadPageData(state.page - 1)
    }

    const loadNextPageData = () => {
      if (extra.end) return
      return loadPageData(state.page + 1)
    }

    // 更新数据
    useEffect(() => {
      const res = request.data
      if (!res || isNaN(res?.page)) return

      setState((state) => {
        if (append) {
          if (res.page > 0 || res.pageSize !== state.pageSize) {
            res.items = state.items.concat(res.items || [])
          }
        }

        return { ...state, ...res }
      })
    }, [request.data])

    useEffect(() => void httpRequest(), [state.page, state.pageSize])

    return {
      loading: request.loading,
      error: request.error,
      message: request.message,
      ...state,
      ...extra,
      refresh,
      loadPageData,
      loadNextPageData,
      loadPrevPageData,
      cancel: request.cancel,
    }
  }
}
