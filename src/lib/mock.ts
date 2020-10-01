import Mock, { MockCbOptions } from 'better-mock'

import { match } from 'path-to-regexp'

export interface MockRequest {
  url: string
  path: string
  query: Record<string, string>
  params: Record<string, string | number>
}

export function createMockAPI(rule: string, type: string, callback: (req: MockRequest) => any) {
  const parse = match(rule)

  const qs = (searchParams: URLSearchParams) => {
    const query: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) {
      query[key] = value
    }
    return query
  }

  Mock.mock(rule, type, (options: MockCbOptions) => {
    const path = options.url
    const url = new URL(path, window.location.origin)

    return callback({
      url: url.toString(),
      path: path,
      query: qs(url.searchParams),
      // @ts-ignore
      params: parse(path).params || {},
    })
  })
}
