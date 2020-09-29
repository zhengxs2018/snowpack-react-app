import React, { FC } from 'react'

import type { RouteConfigComponentProps } from 'react-router-config'

import { getDisplayName } from '../lib/helpers'

export type RouterRenderer = (props: RouteConfigComponentProps<any>) => React.ReactNode

export function withLayoutRenderer<P = {}>(WrappedLayoutComponent: FC) {
  const Layout: FC = (props) => {
    return <WrappedLayoutComponent {...props} />
  }

  Layout.displayName = `withLayoutRenderer(${getDisplayName(WrappedLayoutComponent)})`

  return (Content: FC<RouteConfigComponentProps<P>>, layoutStaticProps?: any): RouterRenderer => (props) => {
    return (
      <Layout {...layoutStaticProps}>
        <Content {...props} />
      </Layout>
    )
  }
}

export function withLayoutComponent(WrappedLayoutComponent: FC) {
  const Layout: FC = (props) => {
    return <WrappedLayoutComponent {...props} />
  }

  Layout.displayName = `withLayoutRenderer(${getDisplayName(WrappedLayoutComponent)})`

  return Layout
}
