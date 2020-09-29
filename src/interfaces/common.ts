export interface List<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  [key: string]: any
}
