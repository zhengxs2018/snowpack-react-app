import React, { FC } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { RouteConfig, matchRoutes, renderRoutes } from 'react-router-config'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

export const routes: RouteConfig[] = [
  { path: '/', exact: true, component: Home },
  { path: '*', component: NotFound },
]

export const RouterView: FC = () => {
  return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
}

export function match(pathname: string) {
  return matchRoutes(routes, pathname)
}
