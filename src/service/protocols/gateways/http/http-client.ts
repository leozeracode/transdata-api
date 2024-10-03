import { HttpStatusCode } from '@/domain/enums'

export type HttpRequest<TRequest = any> = {
  url: string
  auth?: any
  method: HttpMethod
  body?: TRequest
  headers?: any
  params?: any
}

export interface HttpClient {
  request: <TRequest = any, TResponse = any> (data: HttpRequest<TRequest>) => Promise<HttpResponse<TResponse>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpResponse<T = any> = {
  statusCode?: HttpStatusCode
  data?: T
}
