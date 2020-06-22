import { createStore, combineReducers } from 'redux'

import AppReducer from './reducers/app'
import MeReducer from './reducers/me'

import subscribeAuthStatus from './subscribes/authStatus'

// 订阅列表
const subscribes = [subscribeAuthStatus]

// @ts-ignore
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
  combineReducers({
    app: AppReducer,
    me: MeReducer,
  }),
  devtools && devtools(),
)

store.subscribe(() => {
  const rootState = store.getState()
  subscribes.forEach((sub) => sub(store, rootState))
})

if (import.meta.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.store = store
}

export default store
