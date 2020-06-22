import type { Action } from 'redux'

import type { User } from 'src/biz/models/user'
import type { Permission } from 'src/biz/models/access'

import type { LoadMeInfoAction } from '../actions/me'

import { UserStatus } from '../enums'

export interface ChangeUserStatusAction extends Action<'me#changeUserStatus'> {
  payload: {
    status: UserStatus
    message?: string
  }
}

export type MeActions = LoadMeInfoAction| ChangeUserStatusAction

export type MeState = {
  info?: User
  permissions: Permission[]
  status: UserStatus
  message?: string | null
}

const initialState = (): MeState => ({
  permissions: [],
  status: UserStatus.UNKNOWN,
})

export default (state: MeState, action: MeActions): MeState => {
  if (action.type === 'me#loadInfo') {
    return { ...state, ...action.payload, status: UserStatus.CONNECTED, message: null }
  } else if (action.type === 'me#changeUserStatus') {
    return { ...state, ...action.payload }
  }

  return state ?? initialState()
}
