import React, { FC } from 'react'

import { Table, Alert, Input } from 'antd'

import { useUserList } from '../hooks/useUserList'

const UserListPage: FC = () => {
  const { loading, query, items, page, pageSize, total, error, setValue, search, loadPageData } = useUserList({
    autoLoad: true,
  })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
  ]

  const pagination = {
    current: page,
    pageSize: pageSize,
    total: total,
    onChange(page: number) {
      return loadPageData(page, { force: true })
    },
    onShowSizeChange(_: number, pageSize: number) {
      return search({ page: 1, pageSize })
    },
  }

  return (
    <>
      <h1>用户列表</h1>
      {error && <Alert type="error" message="加载错误" description={error.message} closable />}
      <Input
        value={query.nickname}
        placeholder="回车搜索"
        onChange={(evt) => setValue('nickname', evt.target.value.trim())}
        onPressEnter={() => search()}
      />
      <Table loading={loading} columns={columns} dataSource={items} pagination={pagination} rowKey="id" />
    </>
  )
}

export default UserListPage
