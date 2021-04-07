import { ILogger } from "./interfaces";

export type ApplicationLogger = {
  createLogger(context: any): ILogger;
};
