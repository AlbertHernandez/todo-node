import * as Sentry from '@sentry/node';
import { Severity } from '@sentry/node';
import { ErrorContext, ErrorTracker } from './interfaces';
import { BaseError } from '../../errors';
import { ClientError, TooManyRequestsError } from '../../api/errors';
import { ApplicationError } from 'src/application/errors';

export class SentryErrorTracker implements ErrorTracker {
  constructor(dependencies: {
    enabled: boolean;
    dsn: string;
    environment: string;
    serverName: string;
    tracesSampleRate: number;
  }) {
    Sentry.init({
      environment: dependencies.environment,
      dsn: dependencies.dsn,
      tracesSampleRate: dependencies.tracesSampleRate,
      serverName: dependencies.serverName,
      enabled: dependencies.enabled,
    });
  }

  configureScope(callback: (scope: Sentry.Scope) => void): void {
    Sentry.configureScope((scope) => {
      callback(scope);
    });
  }

  private getErrorContext(error: Error): ErrorContext {
    if (error instanceof BaseError) {
      return {
        'Operational Error': error.isOperational,
        Code: error.code,
        Status: error.status,
        Meta: error.meta != null || {},
      };
    }

    return {
      'Operational Error': false,
      Code: 'error.generic',
    };
  }

  private getErrorSeverity(error: Error): Severity {
    if (error instanceof TooManyRequestsError) {
      return Severity.Warning;
    }

    if (error instanceof ClientError) {
      return Severity.Info;
    }

    if (error instanceof ApplicationError) {
      return Severity.Error;
    }

    if (error instanceof BaseError) {
      return Severity.Error;
    }

    return Severity.Fatal;
  }

  async trackError(error: Error): Promise<void> {
    const captureContext = {
      contexts: {
        'Error Context': this.getErrorContext(error),
      },
      level: this.getErrorSeverity(error),
    } as any;

    Sentry.captureException(error, captureContext);
  }
}
