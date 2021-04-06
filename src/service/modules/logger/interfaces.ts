interface LogMethod {
  (msg: string, context?: any): void;
}

export interface ILogger {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  child: (options: any) => ILogger;
}
