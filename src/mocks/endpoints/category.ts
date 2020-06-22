import Mock from 'better-mock'

import categories from '../data/category.json'

if (import.meta.env.NODE_ENV === 'development') {
  Mock.mock('/api/categories', 'GET', () => ({
    code: 200,
    data: categories,
  }))
}
