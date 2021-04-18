import { App } from '../../interfaces'
import { LoggerLevel } from './enums'

interface LogMessage {
  msg: string
  context: any
}

type LogMethod = (message: LogMessage | string) => void

export interface Logger {
  trace: LogMethod
  debug: LogMethod
  info: LogMethod
  warn: LogMethod
  error: LogMethod
  fatal: LogMethod
  child: (options: any) => Logger
}

export interface ApplicationLoggerFactory {
  get: (app: App) => Logger
}

export interface LoggerOptions {
  level?: LoggerLevel
  prettify?: boolean
  utcTimestamp?: boolean
}
