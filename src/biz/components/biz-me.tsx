import React, { FC } from 'react'

import { connect } from 'react-redux'

import type { RootState } from 'src/store/types'

import type { User } from 'src/biz/models/user'
import { AuthStatus, UserStatus } from 'src/store/enums'

export type BizMeState = {
  info?: User
  message?: string | null
  authStatus: AuthStatus
  userStatus: UserStatus
}

const BizMe: FC<BizMeState> = ({ authStatus, info, userStatus, message }) => {
  if (authStatus === AuthStatus.LOADING) {
    return <div>正在查询登录状态</div>
  } else if (authStatus === AuthStatus.NOT_AUTHORIZED) {
    return <div>正在注销登录状态</div>
  } else if (authStatus === AuthStatus.UNKNOWN) {
    return <div>用户未登录，请先登录</div>
  } else if (authStatus === AuthStatus.CONNECTED) {
    if (userStatus === UserStatus.LOADING) {
      return <div>正在加载用户信息</div>
    } else if (userStatus === UserStatus.ERROR) {
      return <div>加载用户失败：{message}</div>
    } else if (userStatus === UserStatus.UNKNOWN) {
      return <div>匿名用户</div>
    } else if (userStatus === UserStatus.CONNECTED) {
      return <div>{info?.nickname ?? info?.username}</div>
    }
  }

  return <div>未知错误</div>
}

function mapStateToProps(state: RootState): BizMeState {
  return {
    info: state.me.info,
    message: state.me.message,
    authStatus: state.app.authStatus,
    userStatus: state.me.status,
  }
}

export default connect<BizMeState, {}, {}, RootState>(mapStateToProps)(BizMe)
