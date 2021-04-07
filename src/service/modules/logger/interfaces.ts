type LogMessage = {
  msg: string;
  context: any;
};

interface ILogMethod {
  (message: LogMessage | string): void;
}

export interface ILogger {
  debug: ILogMethod;
  info: ILogMethod;
  warn: ILogMethod;
  error: ILogMethod;
  child: (options: any) => ILogger;
}
