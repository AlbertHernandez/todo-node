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
  [LoggerLevel.Trace]: LogMethod;
  [LoggerLevel.Debug]: LogMethod;
  [LoggerLevel.Info]: LogMethod;
  [LoggerLevel.Warn]: LogMethod;
  [LoggerLevel.Error]: LogMethod;
  [LoggerLevel.Fatal]: LogMethod;
  child: (options: any) => Logger;
}

export interface ApplicationLogger {
  createLogger(app: App): Logger;
}
