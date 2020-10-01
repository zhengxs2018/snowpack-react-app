import type { AxiosRequestConfig } from 'axios'

import { useState } from 'react'

import { useAxios } from '../useAxios'
import { useList, List } from '../useList'

import { request } from '../../lib/http'
import type { User } from '../../interfaces/user'

import type { UseUserListOptions, UserListQuery, UserListParams } from './types'

export function useUserList(options: UseUserListOptions = {}) {
  const [query, setQuery] = useState<UserListQuery>({
    nickname: '',
  })

  const service = (params: UserListParams, config: AxiosRequestConfig) => {
    return request({ ...config, url: '/api/user/list', params })
  }

  const { loading, error, run, cancel } = useAxios<List<User>, UserListParams>(service, {
    silent: options.silent,
    unique: true,
  })

  const list = useList<User>({
    loading: loading,
    mode: options.mode,
    autoLoad: options.autoLoad,
    onFetch(args) {
      return run({ ...args, nickname: query.nickname })
    },
  })

  function setValue<K extends keyof UserListQuery>(key: K, value: UserListQuery[K]): void {
    return setQuery((state) => ({ ...state, [key]: value }))
  }

  return {
    ...list,
    setQuery,
    setValue,
    loading,
    query,
    error,
    cancel,
  }
}
