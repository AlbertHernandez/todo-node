import { HttpStatusCode } from '../../api/enums'

export interface HttpClientOptions {
  baseUrl?: string
  timeout?: number
  headers?: any
}

export interface ResponseSchema {
  data: any
  status: HttpStatusCode
}

export interface HttpClient {
  get: (url: string, payload?: any) => Promise<ResponseSchema>
  delete: (url: string, payload?: any) => Promise<ResponseSchema>
  post: (url: string, payload?: any) => Promise<ResponseSchema>
  put: (url: string, payload?: any) => Promise<ResponseSchema>
  patch: (url: string, payload?: any) => Promise<ResponseSchema>
}

export interface HttpClientFactory {
  get: (options?: HttpClientOptions) => HttpClient
}
