import { useState, useMemo, useEffect } from 'react'

import type { UseListState, UseListOptions, List, UseListInstance, ListFetchOptions, ListFetchArgs } from './types'

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
export function useList<T>(options: UseListOptions<T>): UseListInstance<T> {
  const onFetch = options.onFetch

  // 列表变更模式
  const mode = options.mode || 'replace'

  // 加载状态
  const loading = options.loading === true

  // 列表状态
  const [state, setState] = useState<UseListState<T>>({
    items: options.items ?? [],
    page: options.page || 1,
    pageSize: options.pageSize || 10,
    total: options.total || 0,
  })

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

  /**
   * 刷新列表
   *
   * @param options 刷新配置
   */
  function refresh(options?: ListFetchOptions) {
    return dispatchRequest({}, { ...options, refresh: true })
  }

  /**
   * 搜索方法
   *
   * @param args 搜索参数
   */
  function search(args?: Partial<ListFetchArgs>) {
    // 默认，搜索就跳转回第一页
    return dispatchRequest({ page: 1, ...args }, { force: true })
  }

  function clear() {
    setState({ items: [], page: 1, pageSize: 10, total: 0 })
  }

  async function dispatchRequest(args?: Partial<ListFetchArgs>, options?: ListFetchOptions) {
    args = args || {}
    options = options || {}

    const page = args.page ?? state.page
    const pageSize = args.pageSize ?? state.pageSize

    if (loading) {
      if (options.force !== true) return Promise.resolve()
    }

    const res = await onFetch({ page, pageSize }, { ...options, state, mode })
    if (!res) return

    let items: T[] = []
    if (mode === 'manual' || options.refresh === true) {
      items = res.items || []
    } else {
      items = mode === 'append' ? state.items.concat(res.items || []) : res.items || []
    }

    setState({ items, page: res.page || page, pageSize: res.pageSize || pageSize, total: res.total || 0 })
  }

  /**
   * 加载制定页数据
   *
   * @param page       指定页
   * @param options
   * @param options.force 是否强制刷新
   */
  function loadPageData(page: number, options?: ListFetchOptions) {
    return dispatchRequest({ page }, options)
  }

  /**
   * 加载上一页数据
   *
   * @param options
   * @param options.force 是否强制刷新
   */
  function loadPreviousPageData(options?: ListFetchOptions) {
    return isFirst ? Promise.resolve() : loadPageData(state.page - 1, options)
  }

  /**
   * 加载下一页数据
   *
   * @param options 可选项
   * @param options.force 是否强制刷新
   */
  function loadNextPageData(options?: ListFetchOptions) {
    return isEnd ? Promise.resolve() : loadPageData(state.page + 1, options)
  }

  /** 数据转换  */
  function toJSON(): List<T> {
    return state
  }

  useEffect(() => {
    // 自动加载
    if (options.autoLoad === true) refresh()
  }, [])

  return {
    // state
    ...state,

    // computed
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
    toJSON,
  }
}
