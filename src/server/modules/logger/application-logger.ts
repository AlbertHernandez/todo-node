import pino from "pino";
import { IApp } from "../../interfaces";
import { ILogger } from "./interfaces";
import { ApplicationLogger } from "./types";

export const applicationLogger: ApplicationLogger = {
  createLogger(app: IApp): ILogger {
    return pino({
      prettyPrint: app.env.development,
      timestamp() {
        return `Time: ${
          app.env.development
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
