import React, { FC, lazy } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { RouteConfig, matchRoutes, renderRoutes } from 'react-router-config'

import { withBasicLayoutRenderer } from './layouts/BasicLayout'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

export const routes: RouteConfig[] = [
  { path: '/', exact: true, render: withBasicLayoutRenderer(Home) },
  { path: '/table', render: withBasicLayoutRenderer(lazy(() => import('./pages/UserList'))) },
  { path: '*', render: withBasicLayoutRenderer(NotFound) },
]

export const RouterView: FC = () => {
  return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
}

export function match(pathname: string) {
  return matchRoutes(routes, pathname)
}
