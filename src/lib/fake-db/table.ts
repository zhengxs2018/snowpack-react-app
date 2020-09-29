import Mock from 'better-mock'

import type { Table } from './types'

export function createTable<T = any>(template: string | Record<string, any> | Function, range = 83): Table<T> {
  return Mock.mock({
    [`rows|${range}`]: [template],
    total() {
      return this.rows.length
    },
  })
}
