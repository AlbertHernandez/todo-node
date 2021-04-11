import { App } from "../../interfaces";

type LogMessage = {
  msg: string;
  context: any;
};

interface LogMethod {
  (message: LogMessage | string): void;
}

export interface Logger {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  child: (options: any) => Logger;
}

export interface ApplicationLogger {
  createLogger(app: App): Logger;
}
