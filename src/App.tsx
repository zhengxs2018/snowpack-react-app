import React, { FC, Suspense } from 'react'
import { Provider } from 'react-redux'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import store from './store/index'
import { RouterView } from './router'

export type AppState = {}

const App: FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={() => <div>Loading</div>}>
          <RouterView />
        </Suspense>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)

export default App
