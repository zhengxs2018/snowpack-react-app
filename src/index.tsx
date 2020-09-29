import 'antd/dist/antd.css'

import axios from 'axios'

import React from 'react'
import ReactDOM from 'react-dom'

import './mocks/index'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}

if (import.meta.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.axios = axios
}
