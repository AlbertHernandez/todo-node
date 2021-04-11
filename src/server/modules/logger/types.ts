import { IApp } from "../../interfaces";
import { ILogger } from "./interfaces";

export type ApplicationLogger = {
  createLogger(app: IApp): ILogger;
};
