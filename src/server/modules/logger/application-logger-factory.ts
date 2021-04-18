import { ApplicationLoggerFactory, Logger } from './interfaces'
import { Env } from '../../config/environment/interfaces'
import { loggerFactory } from './logger-factory'

export const applicationLoggerFactory: ApplicationLoggerFactory = {
  get (app): Logger {
    const env: Env = app.env
    return loggerFactory.get({
      level: env.loggerLevel,
      prettify: env.development,
      utcTimestamp: !env.development
    })
  }
}
