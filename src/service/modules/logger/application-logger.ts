import pino from "pino";
import { ILogger } from "./interfaces";
import { ApplicationLogger } from "./types";

export const applicationLogger: ApplicationLogger = {
  createLogger(context: any): ILogger {
    return pino({
      prettyPrint: context.env.development,
      timestamp() {
        return `Time: ${
          context.env.development
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
