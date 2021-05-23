import pino from 'pino';
import { Logger, LoggerOptions } from './interfaces';

export const loggerFactory = {
  get(options: LoggerOptions = {}): Logger {
    return pino({
      level: options.level ?? 'info',
      prettyPrint: options.prettify,
      timestamp() {
        return `Time: ${
          options.utcTimestamp === true
            ? new Date(Date.now()).toLocaleString('en-US', {
                hour12: false,
                timeZoneName: 'short',
                timeZone: 'UTC',
              })
            : new Date(Date.now()).toLocaleString('en-US', {
                hour12: false,
                timeZoneName: 'short',
              })
        }`;
      },
    });
  },
};
