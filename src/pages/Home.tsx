import React, { FC, useState, useEffect } from 'react'

import { connect } from 'react-redux'

import type { RootState } from 'src/store/types'
import type { Categories } from 'src/store/actions/app'

import { useBillListByPagination } from 'src/biz/services/bill'

import BizMe from 'src/biz/components/biz-me'
import BizCategorySelect from 'src/biz/components/biz-category-select'

export type AppState = {
  categories: Categories
}

const Home: FC<AppState> = ({ categories }) => {
  const [categoryId, setCategoryId] = useState<string>()

  const getCategoryById = (categoryId: string) => categories.items.find((item) => item.id === categoryId)

  const billData = useBillListByPagination({
    filters: { categoryId },
  })

  const rendersList = () => {
    if (billData.loading) {
      return <div>加载中</div>
    }

    if (billData.error) {
      return <div>加载错误：{billData.message}</div>
    }

    const items = billData.items
    if (items.length === 0) {
      return <div>暂无数据</div>
    }

    const list = items.map((item) => {
      const category = getCategoryById(item.category)
      return (
        <li key={Math.random()}>
          <p>
            category: {category ? category.name : '其他'} type: {item.type}
          </p>
          <p>
            time: {item.time} amount: {item.amount}
          </p>
        </li>
      )
    })

    return (
      <div>
        <p>共 {billData.total} 条数据 </p>
        <ul>{list}</ul>
        {billData.pageCount > 1 && [
          <button key="prev" disabled={billData.page === 1} onClick={billData.loadPrevPageData}>
            上一页
          </button>,
          <button key="next" disabled={billData.end} onClick={billData.loadNextPageData}>
            下一页
          </button>,
          <span key="paging">
            {' '}
            {billData.page}/{billData.pageSize}
          </span>,
        ]}
      </div>
    )
  }

  // 第一次加载数据只能在外面判断
  // 目前还没想好如何在 usePaginated 里面进行初始化
  useEffect(() => void billData.refresh(), [categoryId])

  return (
    <>
      <BizMe></BizMe>
      <br/>
      <BizCategorySelect value={categoryId} onInput={setCategoryId} />
      {rendersList()}
    </>
  )
}

export default connect<AppState, {}, {}, RootState>(function mapStateToProps(state) {
  return { categories: state.app.categories }
})(Home)
