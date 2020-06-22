import type { Action } from 'redux'

import { fetch } from 'src/lib/http'

import store from '../index'

import type { User } from 'src/biz/models/user'

export interface LoadMeInfoAction extends Action<'me#loadInfo'> {
  payload: { info: User}
}

export async function loadMeInfo(): Promise<void> {
  const info = await fetch<User>('/api/me')
  store.dispatch({ type: 'me#loadInfo', payload: { info } })
}
