import type { ListChangeMode, ListFetchArgs } from '../useList'

export interface UserListQuery {
  nickname?: string
}

export interface UserListParams extends UserListQuery, ListFetchArgs {
  // pass
}

export interface UseUserListOptions {
  autoLoad?: boolean
  mode?: ListChangeMode
  silent?: boolean
}

// 不能删除，否则 snowpack 会运行报错
export default {}
