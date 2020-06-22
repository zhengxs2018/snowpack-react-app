import type { Store, RootState } from '../types'

import { AuthStatus, UserStatus } from '../enums'
import { loadMeInfo } from '../actions/me'

export default async (store: Store, { app, me }: RootState) => {
  const authStatus = app.authStatus
  const userStatus = me.status

  if (authStatus === AuthStatus.CONNECTED) {
    if (userStatus === UserStatus.LOADING || userStatus === UserStatus.CONNECTED) return

    try {
      store.dispatch({
        type: 'me#changeUserStatus',
        payload: { status: UserStatus.LOADING},
      })
      await loadMeInfo()
    } catch (e) {
      store.dispatch({
        type: 'me#changeUserStatus',
        payload: {
          status: UserStatus.ERROR,
          message: e.message,
        }
      })
    }
  } else if (authStatus === AuthStatus.NOT_AUTHORIZED) {
    // 注销登录
    window.location.href = '/'
    return
  }
}
