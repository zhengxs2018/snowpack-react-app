import type { Action } from 'redux'

import { fetch } from 'src/lib/http'
import { debuglog } from 'src/lib/util'

import type { Category } from 'src/biz/models/category'

import store from '../index'
import { AuthStatus } from '../enums'

const debug = debuglog('redux::app#actions')

export interface LoadAuthStatusAction extends Action<'app#authStatus'> {
  payload: {
    authStatus: AuthStatus
  }
}

export async function loadAuthStatus(): Promise<void> {
  try {
    store.dispatch({ type: 'app#authStatus', payload: { authStatus: AuthStatus.LOADING } })
    const authStatus = await fetch<AuthStatus>('/api/auth/status')
    store.dispatch({ type: 'app#authStatus', payload: { authStatus } })
  } catch (e) {
    debug(e.message)
    store.dispatch({ type: 'app#authStatus', payload: { authStatus: AuthStatus.UNKNOWN } })
  }
}

export type Categories = {
  loading: boolean
  items: Category[]
  error: boolean
}

export interface LoadAllCategoriesAction extends Action<'app#loadAllCategories'> {
  payload: Partial<Categories>
}

export async function loadAllCategories(): Promise<void> {
  try {
    store.dispatch({
      type: 'app#loadAllCategories',
      payload: { loading: false },
    })

    const items = await fetch<Category[]>('/api/categories')
    store.dispatch({
      type: 'app#loadAllCategories',
      payload: { loading: false, items: items ?? [] },
    })
  } catch (e) {
    debug(e.message)
    store.dispatch({
      type: 'app#loadAllCategories',
      payload: { loading: false, error: true },
    })
  }
}
