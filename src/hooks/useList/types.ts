/** 列表变更模式 */
export type ListChangeMode = 'append' | 'replace' | 'manual'

/**
 * 分页器
 */
export interface Pagination {
  /** 当前页数 */
  page: number
  /** 每页条数 */
  pageSize: number
  /** 数据总数 */
  total: number
}

/**
 * 列表数据结构
 */
export interface List<T> extends Pagination {
  /**
   * 数据数组
   */
  items: T[]
}

/**
 * 列表状态
 */
export type UseListState<T> = List<T>

/**
 * 列表数据请求函数参数
 */
export type ListFetchArgs = Omit<Pagination, 'total'>

/**
 * 加载配置项
 */
export interface ListFetchOptions {
  /** 刷新数据 */
  refresh?: boolean
  /** 强制获取数据 */
  force?: boolean
}
/**
 * 列表数据请求函数配置项
 */
export interface ListFetchHandlerOptions<T> extends ListFetchOptions {
  /** 数据变更模式 */
  mode: ListChangeMode
  /** 列表状态数据 */
  state: List<T>
}

/**
 * 请求响应结果
 */
export interface ListFetchResponse<T> extends Partial<ListFetchArgs> {
  items: T[]
  total: number
}

/**
 * 请求处理
 */
export type ListFetchHandler<T> = (
  args: ListFetchArgs,
  options: ListFetchHandlerOptions<T>,
) => Promise<ListFetchResponse<T>>

/**
 * UseList 配置参数
 */
export interface UseListOptions<T> extends Partial<List<T>> {
  /** 数据变更模式 */
  mode?: ListChangeMode
  /** 加载状态 */
  loading?: boolean
  /** 自动加载 */
  autoLoad?: boolean
  /** 获取数据 */
  onFetch: ListFetchHandler<T>
}

export interface UseListInstance<T> {
  items: T[]
  page: number
  pageSize: number
  total: number

  isFirst: boolean
  isEnd: boolean

  // async methods
  refresh(options?: ListFetchOptions): Promise<void>
  search(args?: Partial<ListFetchArgs>): Promise<void>

  loadPageData(page: number, options?: ListFetchOptions): Promise<void>
  loadPreviousPageData(options?: ListFetchOptions): Promise<void>
  loadNextPageData(options?: ListFetchOptions): Promise<void>

  // sync methods
  clear(): void
  toJSON(): List<T>
}

// 不能删除，否则 snowpack 会运行报错
export default {}
