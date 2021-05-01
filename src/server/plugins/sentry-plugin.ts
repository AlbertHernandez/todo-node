import * as Awilix from 'awilix'

import { Plugin } from './interfaces/plugin-interface'
import { ConfigurationError } from '../errors'
import { SentryErrorTracker } from '../modules/error-tracker'
import { Env } from '../config/environment/interfaces'

export const sentryPlugin: Plugin = async (app) => {
  app.logger.trace('Starting Sentry Plugin...')
  const env: Env = app.env

  if (env.sentry.isEnabled && (env.sentry.dns === '')) {
    throw new ConfigurationError(
      'Setting sentry plugin but no Sentry DNS configured',
      'error.configuration.noSentryDns'
    )
  }

  app.container.register({
    errorTracker: Awilix.asClass(SentryErrorTracker).setLifetime(
      Awilix.Lifetime.SINGLETON
    )
  })

  app.logger.trace('Finalization Sentry Plugin!')
}
