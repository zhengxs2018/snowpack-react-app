import joi from 'joi'

import { useMockAPI } from '../hooks/useMockAPI/index'
import { createTable, QueryBuilder } from '../lib/fake-db/index'

import type { User } from '../interfaces/user'

export type UserListQuery = {
  nickname?: string
  page: number
  pageSize: number
}

const table = createTable<User>({
  id: '@id',
  username: '@first',
  nickname: '@cname',
})

const schema = joi.object<UserListQuery>({
  page: joi.number().default(1),
  pageSize: joi.number().default(10),
  nickname: joi.string().trim().optional().empty(''),
})

function createQueryBuilder(args: UserListQuery) {
  const { nickname, page, pageSize } = args

  const query = QueryBuilder.create(table)
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  if (nickname) {
    query.where((row: User) => {
      console.log(row.nickname, nickname)
      return row.nickname.indexOf(nickname as string) > -1
    })
  }

  return query
}

useMockAPI('/api/user/list', 'GET', (ctx) => {
  const result = schema.validate(ctx.query)
  console.log(result)
  return { code: 200, data: createQueryBuilder(result.value).pagination() }
})
