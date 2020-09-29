import { useState } from 'react'

import axios, { CancelTokenSource } from 'axios'

import type { UseAxiosService, UseAxiosOptions, UseAxiosState, UseAxiosInstance } from './types'

const CancelToken = axios.CancelToken

const never: Promise<never> = new Promise(() => {
  // pass
})

export function useAxios<T = any, U = any, S extends UseAxiosService<T, U> = any>(
  service: S,
  options: UseAxiosOptions = {},
): UseAxiosInstance<T, U> {
  let cancelSource: CancelTokenSource | null = null

  const unique = options.unique !== true
  const silent = options.silent !== false

  const [state, setState] = useState<UseAxiosState<T>>({
    loading: false,
    data: null,
    error: null,
  })

  const onSuccess = (data: T) => {
    setState({ loading: false, data: data, error: null })
    return data
  }
  const onError = (error: Error): Promise<never> => {
    setState({ loading: false, data: null, error })
    return silent ? never : Promise.reject(error)
  }

  const run = (args: U): Promise<T> => {
    if (unique) cancel()

    const source = CancelToken.source()
    cancelSource = source

    setState({ loading: true, data: null, error: null })
    return service(args, { cancelToken: source.token }).then(onSuccess, onError)
  }

  const cancel = (message?: string) => {
    if (cancelSource) {
      cancelSource.cancel(message)
      cancelSource = null
    }
  }

  return {
    ...state,
    run,
    cancel,
  }
}
