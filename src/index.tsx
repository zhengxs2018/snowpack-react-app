import './styles/reset.css'

import React from 'react'
import ReactDOM from 'react-dom'

import './mocks/setup'

import { loadAuthStatus, loadAllCategories } from './store/actions/app'

import App from './App'

loadAuthStatus()
loadAllCategories()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
