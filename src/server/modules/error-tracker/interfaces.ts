import * as Koa from 'koa'
import { HttpStatusCode } from '../../api/enums'

export interface ErrorTracker {
  trackError: (error: Error, context?: any) => Promise<void>
  configureRequestScope: (ctx: Koa.Context) => void
}

export interface ErrorContext {
  'Operational Error': boolean
  Code: string
  Status?: HttpStatusCode
  Meta?: any
}
