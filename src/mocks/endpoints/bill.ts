import Mock from 'better-mock'

import { parseInt } from 'lodash-es'

import bill from '../data/bill.json'

if (import.meta.env.NODE_ENV === 'development') {
  Mock.mock('/api/bill/list', 'GET', (req: { url: string }) => {
    const url = new URL(req.url, window.location.origin)
    const searchParams = url.searchParams
    const page = parseInt(searchParams.get('page') ?? '1')
    const pageSize = parseInt(searchParams.get('pageSize') ?? '10')
    const categoryId = searchParams.get('categoryId')
    const items = categoryId ? bill.filter((b) => b.category === categoryId) : bill
    const skip = page * pageSize

    return {
      code: 200,
      data: {
        items: items.slice(skip - pageSize, skip),
        page: page,
        pageSize: pageSize,
        total: items.length,
      },
    }
  })
}
