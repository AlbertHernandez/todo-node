import { RequestScope } from './request-scope-interface'

export interface ErrorTracker {
  trackError: (error: Error, context?: any) => Promise<void>
  configureRequestScope: (requestScope: RequestScope) => void
}
