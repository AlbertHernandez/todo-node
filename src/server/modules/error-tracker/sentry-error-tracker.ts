import * as Sentry from '@sentry/node'
import { Severity } from '@sentry/node'
import { ErrorContext, ErrorTracker, RequestScope } from './interfaces'
import { BaseError } from '../../errors'
import { ClientError, TooManyRequestsError } from '../../api/errors'
import { ApplicationError } from '../../../application/errors'
import { Logger } from '../logger/interfaces'
import { Env } from '../../config/environment/interfaces'

export class SentryErrorTracker implements ErrorTracker {
  constructor (dependencies: { env: Env, logger: Logger }) {
    if (dependencies.env.sentry.isEnabled) {
      dependencies.logger.trace('Sentry is enabled')
    } else {
      dependencies.logger.trace('Sentry is disabled')
    }

    Sentry.init({
      environment: dependencies.env.environment,
      dsn: dependencies.env.sentry.dns,
      tracesSampleRate: 1.0,
      serverName: 'Todo Node',
      enabled: dependencies.env.sentry.isEnabled
    })
  }

  configureRequestScope (requestScope: RequestScope): void {
    Sentry.configureScope((scope) => {
      if (requestScope.request != null) {
        scope.addEventProcessor((event) => {
          return Sentry.Handlers.parseRequest(event, requestScope.request)
        })
      }

      if (requestScope.context != null) {
        scope.setContext('Request', requestScope.context)
      }

      if (requestScope.user != null) {
        const { ip, name, type, ...restUserProps } = requestScope.user
        scope.setUser({
          ip_address: ip,
          username: name,
          type: type,
          ...restUserProps
        })
      }
    })
  }

  private getErrorContext (error: Error): ErrorContext {
    if (error instanceof BaseError) {
      return {
        'Operational Error': error.isOperational,
        Code: error.code,
        Status: error.status,
        Meta: (error.meta != null) || {}
      }
    }

    return {
      'Operational Error': false,
      Code: 'error.generic'
    }
  }

  private getErrorSeverity (error: Error): Severity {
    if (error instanceof TooManyRequestsError) {
      return Severity.Warning
    }

    if (error instanceof ClientError) {
      return Severity.Info
    }

    if (error instanceof ApplicationError) {
      return Severity.Error
    }

    if (error instanceof BaseError) {
      return Severity.Error
    }

    return Severity.Fatal
  }

  async trackError (error: Error): Promise<void> {
    const captureContext = {
      contexts: {
        'Error Context': this.getErrorContext(error)
      },
      level: this.getErrorSeverity(error)
    } as any

    Sentry.captureException(error, captureContext)
  }
}
