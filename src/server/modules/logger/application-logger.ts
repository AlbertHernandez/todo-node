import pino from "pino";
import { ApplicationLogger, Logger } from "./interfaces";
import { Env } from "../../config/environment/interfaces";

export const applicationLogger: ApplicationLogger = {
  createLogger(app): Logger {
    const env: Env = app.env;
    return pino({
      level: env.loggerLevel,
      prettyPrint: env.development,
      timestamp() {
        return `Time: ${
          env.development
            ? new Date(Date.now()).toLocaleString("en-US", {
                hour12: false,
                timeZoneName: "short",
              })
            : new Date(Date.now()).toLocaleString("en-US", {
                hour12: false,
                timeZoneName: "short",
                timeZone: "UTC",
              })
        }`;
      },
    });
  },
};
