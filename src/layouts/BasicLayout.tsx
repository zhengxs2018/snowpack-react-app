import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Layout, Menu } from 'antd'

import { withLayoutRenderer } from './Layout'

const { Header, Content, Footer, Sider } = Layout
const { Item } = Menu

type MenuProps = React.ComponentProps<typeof Menu>

type MenuClickHandler = MenuProps['onClick']

const BasicLayout: FC = ({ children }) => {
  const history = useHistory()

  const onClick: MenuClickHandler = (info) => {
    history.push(info.key.toString())
  }

  return (
    <Layout>
      <Header></Header>
      <Content style={{ padding: '0 20px' }}>
        <Layout style={{ padding: '24px 0' }}>
          <Sider width={200}>
            <Menu mode="inline" defaultSelectedKeys={['table']} style={{ height: '100%' }} onClick={onClick}>
              <Item key="table">表格</Item>
              <Item key="list">列表</Item>
              <Item key="infinity">无限滚动</Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by zhengxs2018</Footer>
    </Layout>
  )
}

export const withBasicLayoutRenderer = withLayoutRenderer(BasicLayout)

export default BasicLayout
