interface ILogMethod {
  (msg: string, context?: any): void;
}

export interface ILogger {
  debug: ILogMethod;
  info: ILogMethod;
  warn: ILogMethod;
  error: ILogMethod;
  child: (options: any) => ILogger;
}
