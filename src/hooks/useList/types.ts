/** 列表变更模式 */
export type ListChangeMode = 'append' | 'replace' | 'manual'

/**
 * 列表数据结构
 */
export interface List<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  [key: string]: any
}

/**
 * 加载参数
 */
export interface LoadArgs {
  page: number
  pageSize: number
}

/**
 * 加载配置项
 */
export interface LoadOptions {
  refresh?: boolean
  force?: boolean
}

/**
 * 列表状态
 */
export interface UseListState<T> extends Pick<List<T>, 'items' | 'page' | 'pageSize' | 'total'> {
  // pass
}

export interface DispatchRequestOptions<T> extends LoadOptions {
  mode: ListChangeMode
  state: UseListState<T>
}

/**
 * 请求发送
 */
export type DispatchRequest<T> = (args: LoadArgs, options: DispatchRequestOptions<T>) => Promise<List<T>>

/**
 * UseList 配置参数
 */
export interface UseListOptions<T> extends Partial<UseListState<T>> {
  mode?: ListChangeMode
  loading?: boolean
  dispatchRequest: DispatchRequest<T>
}

export default {}
