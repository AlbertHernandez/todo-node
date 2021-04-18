import { ObjectSchema } from '@hapi/joi'
import { UserName, UserType } from './enums'

export interface Request {
  body: any
  query: any
  headers: any
  params: any
}

export interface SchemasConfig {
  body?: ObjectSchema
  query?: ObjectSchema
  headers?: ObjectSchema
  params?: ObjectSchema
}

export interface ApiUser {
  type: UserType
  name: UserName
  key: string
}

export interface RequestContext {
  requestId: string
}
