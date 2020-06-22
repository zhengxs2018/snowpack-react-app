import Mock from 'better-mock'

if (import.meta.env.NODE_ENV === 'development') {
  Mock.mock('/api/me', 'GET', () => Mock.mock({
    code: 200,
    data: {
      id: 0,
      username: '@lower(@last)',
      nickname: '@cname()',
    },
  }))
}
