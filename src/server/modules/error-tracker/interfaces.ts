import { HttpStatusCode } from '../../api/enums'

export interface ErrorTracker {
  trackError: (error: Error, context?: any) => Promise<void>
  configureRequestScope: (requestScope: RequestScope) => void
}

export interface ErrorContext {
  'Operational Error': boolean
  Code: string
  Status?: HttpStatusCode
  Meta?: any
}

export interface RequestScope {
  user?: {
    [key: string]: any
    ip?: string
    name?: string
    type?: string
  }
  request?: any
  context?: {
    [key: string]: any
    requestId?: string
  }
}
