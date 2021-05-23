import * as Sentry from '@sentry/node';

export interface ErrorTracker {
  trackError: (error: Error, context?: any) => Promise<void>;
  configureScope: (callback: (scope: Sentry.Scope) => void) => void;
}
