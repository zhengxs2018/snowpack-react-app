import { useState } from 'react'

import type { AxiosRequestConfig } from 'axios'

import { request } from '../../lib/http'

import { useAxios } from '../useAxios'
import { useList, ListChangeMode, LoadArgs } from '../useList'

import type { User } from '../../interfaces/user'
import type { List } from '../../interfaces/common'

export interface UserListQuery {
  nickname?: string
}

export interface UserRequestParams extends UserListQuery, LoadArgs {
  // pass
}

export interface UseUserListOptions {
  mode?: ListChangeMode
  silent?: boolean
}

export function useUserList(options: UseUserListOptions = {}) {
  const [query, setQuery] = useState<UserListQuery>({
    nickname: '',
  })

  const service = (params: UserRequestParams, config: AxiosRequestConfig) => {
    return request({ ...config, url: '/api/user/list', params })
  }

  const http = useAxios<List<User>, UserRequestParams>(service, {
    silent: options.silent,
    unique: true,
  })

  const list = useList<User>({
    loading: http.loading,
    mode: options.mode,
    dispatchRequest(args) {
      return http.run({ ...args, ...query })
    },
  })

  const setNickname = (nickname: string) => {
    setQuery((state) => ({ ...state, nickname }))
  }

  return {
    ...query,
    ...http,
    ...list,

    setQuery,
    setNickname,
  }
}
