import { LoggerLevel } from '../enums'

export interface LoggerOptions {
  level?: LoggerLevel
  prettify?: boolean
  utcTimestamp?: boolean
}
