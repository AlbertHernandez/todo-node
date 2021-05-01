import { LoggerLevel } from '../constants'

export interface LoggerOptions {
  level?: LoggerLevel
  prettify?: boolean
  utcTimestamp?: boolean
}
