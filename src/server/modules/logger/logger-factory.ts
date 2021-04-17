import pino from "pino";
import { Logger, LoggerOptions } from "./interfaces";

export const loggerFactory = {
  get(options: LoggerOptions = {}): Logger {
    return pino({
      level: options.level,
      prettyPrint: options.prettify,
      timestamp() {
        return `Time: ${
          options.utcTimestamp
            ? new Date(Date.now()).toLocaleString("en-US", {
                hour12: false,
                timeZoneName: "short",
                timeZone: "UTC",
              })
            : new Date(Date.now()).toLocaleString("en-US", {
                hour12: false,
                timeZoneName: "short",
              })
        }`;
      },
    });
  },
};
