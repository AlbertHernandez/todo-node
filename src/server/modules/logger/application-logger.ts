import { ApplicationLogger, Logger } from "./interfaces";
import { Env } from "../../config/environment/interfaces";
import { loggerFactory } from "./logger-factory";

export const applicationLogger: ApplicationLogger = {
  createLogger(app): Logger {
    const env: Env = app.env;
    return loggerFactory.get({
      level: env.loggerLevel,
      prettify: env.development,
      utcTimestamp: !env.development,
    });
  },
};
