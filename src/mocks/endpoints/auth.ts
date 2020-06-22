import Mock from 'better-mock'

const { mock, Random } = Mock

if (import.meta.env.NODE_ENV === 'development') {
  mock('/api/auth/status', 'GET', () => ({
    code: 200,
    data: Random.pick(['connected', 'unknown']),
  }))
}
