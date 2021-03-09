export const toReq = (request: Request) => {
  let headers: Record<string, string> | undefined

  const url = new URL(request.url)
  const result = {
    url: url.pathname + url.search,
    path: url.pathname,
    protocol: url.protocol,
    host: url.host,
    method: request.method,
    get headers() {
      if (headers) return headers
      headers = {}
      request.headers.forEach((value, key) => {
        headers![key] = value
      })
      return headers
    },
  }

  return result
}

export const getRes = (event: FetchEvent) => {
  let body: string
  const headers: Record<string, string> = {}

  const res = {
    headers,
    setHeader(key: string, value: string) {
      headers[key] = value
    },
    writeHead(status: number, _headers?: Record<string, string>) {
      res.statusCode = status
      if (headers) {
        Object.assign(headers, _headers)
      }
    },
    end(text: string) {
      if (text != null) {
        body = text
      }
      event.respondWith(
        new Response(body, {
          status: res.statusCode,
          headers,
        }),
      )
    },
    statusCode: 200,
  }

  return res
}

export type Handler = (
  req: ReturnType<typeof toReq>,
  res: ReturnType<typeof getRes>,
) => void | Promise<void>

export const createHandler = (event: FetchEvent) => {
  const req = toReq(event.request)
  const res = getRes(event)

  return (handler: Handler) => handler(req, res)
}
