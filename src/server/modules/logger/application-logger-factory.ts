import { env } from '@server/config/environment';
import { ApplicationLoggerFactory, Logger } from './interfaces';
import { loggerFactory } from './logger-factory';

export const applicationLoggerFactory: ApplicationLoggerFactory = {
  get(): Logger {
    return loggerFactory.get({
      level: env.loggerLevel,
      prettify: env.development,
      utcTimestamp: !env.development,
    });
  },
};
