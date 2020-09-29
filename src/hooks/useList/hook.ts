import { useState, useMemo } from 'react'

import type { UseListOptions, UseListState, LoadOptions, LoadArgs } from './types'

/**
 * 列表 hook 函数
 *
 * @param options 配置参数
 * @param options.mode 列表变更模式
 * @param options.items 列表默认数据
 * @param options.page 起始页码
 * @param options.pageSize 每页显示条数
 * @param options.total 总数
 *
 * @example javascript
 *
 * const { items, page, pageSize, total, loadPreviousPageData, loadNextPageData } = useList({
 *   dispatchRequest({ page, pageSize }){
 *     // 发送 http 请求
 *     return getUserList({ page, pageSize })
 *   }
 * })
 *
 * @return 返回列表状态与方法
 */
export function useList<T>(options: UseListOptions<T>) {
  const dispatchRequest = options.dispatchRequest

  const mode = options.mode || 'replace'

  const [state, setState] = useState<UseListState<T>>({
    items: options.items ?? [],
    page: options.page || 1,
    pageSize: options.pageSize || 10,
    total: options.total || 0,
  })

  /**
   * 加载状态
   */
  const loading = useMemo<boolean>(() => options.loading === true, [options.loading])

  /**
   * 是否第一页
   */
  const isFirst = useMemo<boolean>(() => state.page === 1, [state.page, state.total])

  /**
   * 列表是否到底
   */
  const isEnd = useMemo<boolean>(() => state.total > 0 && state.page >= state.total / state.pageSize, [
    state.page,
    state.total,
  ])

  function refresh(options?: LoadOptions) {
    return load({}, { ...options, refresh: true })
  }

  function search(args?: Partial<LoadArgs>) {
    return load(args, { force: true })
  }

  function clear() {
    setState({ items: [], page: 1, pageSize: 10, total: 0 })
  }

  async function load(args?: Partial<LoadArgs>, options?: LoadOptions) {
    args = args || {}
    options = options || {}

    const page = args.page ?? state.page
    const pageSize = args.pageSize ?? state.pageSize

    if (loading) {
      if (options.force !== true) return Promise.resolve()
    }

    const res = await dispatchRequest({ page, pageSize }, { ...options, state, mode })
    if (!res) return

    let items: T[] = []
    if (mode === 'manual' || options.refresh === true) {
      items = res.items
    } else {
      items = mode === 'append' ? state.items.concat(res.items) : res.items
    }

    setState({ items, page, pageSize, total: res.total })
  }

  function loadPageData(page: number, options?: LoadOptions) {
    return load({ page }, options)
  }

  /**
   * 加载上一页数据
   *
   * @param options
   * @param options.force 是否强制刷新
   */
  function loadPreviousPageData(options?: LoadOptions) {
    return isFirst ? Promise.resolve() : loadPageData(state.page - 1, options)
  }

  /**
   * 加载下一页数据
   *
   * @param options 可选项
   * @param options.force 是否强制刷新
   */
  function loadNextPageData(options?: LoadOptions) {
    return isEnd ? Promise.resolve() : loadPageData(state.page + 1, options)
  }

  return {
    ...state,

    // computed
    loading,
    isFirst,
    isEnd,

    // async methods
    refresh,
    search,

    loadPageData,
    loadPreviousPageData,
    loadNextPageData,

    // sync methods
    clear,
  }
}
