import { LogMethod } from './log-method-interface';

export interface Logger {
  trace: LogMethod;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
  child: (options: any) => Logger;
}
