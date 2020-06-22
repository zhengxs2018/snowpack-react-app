import type { Bill } from 'src/biz/models/bill'

import { usePaginated } from 'src/hooks/usePaginated'

/**
 * 账单列表查询
 */
export const useBillListByPagination = usePaginated<Bill>('/api/bill/list')
