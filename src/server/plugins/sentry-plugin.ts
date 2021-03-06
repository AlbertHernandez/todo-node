import * as Awilix from 'awilix';

import { Plugin } from './interfaces/plugin-interface';
import { ConfigurationError } from '../errors';
import { SentryErrorTracker } from '../modules/error-tracker';
import { App } from '../interfaces';

export class SentryPlugin implements Plugin {
  enabled;
  dsn;
  environment;
  serverName;
  tracesSampleRate;

  constructor(dependencies: {
    enabled?: boolean;
    dsn: string;
    environment: string;
    serverName: string;
    tracesSampleRate: number;
  }) {
    this.enabled = dependencies.enabled;
    this.dsn = dependencies.dsn;
    this.environment = dependencies.environment;
    this.serverName = dependencies.serverName;
    this.tracesSampleRate = dependencies.tracesSampleRate;
  }

  async use(app: App): Promise<void> {
    app.logger.trace('Starting Sentry Plugin...');

    if (this.enabled) {
      app.logger.trace('Sentry is enabled');
    } else {
      app.logger.trace('Sentry is disabled');
    }

    if (this.enabled && this.dsn === '') {
      throw new ConfigurationError(
        'Setting sentry plugin but no Sentry DNS configured',
        'error.configuration.noSentryDns',
      );
    }

    app.container.register({
      errorTracker: Awilix.asClass(SentryErrorTracker)
        .inject(() => ({
          enabled: this.enabled,
          dsn: this.dsn,
          environment: this.environment,
          serverName: this.serverName,
          tracesSampleRate: this.tracesSampleRate,
        }))
        .setLifetime(Awilix.Lifetime.SINGLETON),
    });

    app.logger.trace('Finalization Sentry Plugin!');
  }
}
