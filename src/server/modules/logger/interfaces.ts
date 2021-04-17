import { App } from "../../interfaces";
import { LoggerLevel } from "./enums";

type LogMessage = {
  msg: string;
  context: any;
};

interface LogMethod {
  (message: LogMessage | string): void;
}

export interface Logger {
  trace: LogMethod;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
  child: (options: any) => Logger;
}

export interface ApplicationLoggerFactory {
  get(app: App): Logger;
}

export interface LoggerOptions {
  level?: LoggerLevel;
  prettify?: boolean;
  utcTimestamp?: boolean;
}
