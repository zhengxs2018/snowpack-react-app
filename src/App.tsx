import React, { FC } from 'react'
import { Provider } from 'react-redux'

import store from './store/index'
import { RouterView } from './router'

export type AppState = {}

const App: FC = () => (
  <Provider store={store}>
    <RouterView />
  </Provider>
)

export default App
