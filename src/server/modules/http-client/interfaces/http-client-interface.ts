import { ResponseSchema } from './response-schema-interface'

export interface HttpClient {
  get: (url: string, payload?: any) => Promise<ResponseSchema>
  delete: (url: string, payload?: any) => Promise<ResponseSchema>
  post: (url: string, payload?: any) => Promise<ResponseSchema>
  put: (url: string, payload?: any) => Promise<ResponseSchema>
  patch: (url: string, payload?: any) => Promise<ResponseSchema>
}
