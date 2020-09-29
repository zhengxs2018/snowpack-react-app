import { createStore, combineReducers } from 'redux'

import AppReducer from './reducers/app'

// @ts-ignore
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
  combineReducers({
    app: AppReducer,
  }),
  devtools && devtools(),
)

if (import.meta.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.store = store
}

export default store
