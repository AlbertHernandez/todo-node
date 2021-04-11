import pino from "pino";
import { IApp } from "../../interfaces";
import { ILogger } from "./interfaces";
import { ApplicationLogger } from "./types";
import { Env } from "../../config/environment/types";

export const applicationLogger: ApplicationLogger = {
  createLogger(app: IApp): ILogger {
    const env: Env = app.env;
    return pino({
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
