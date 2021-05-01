import { LoggerLevel } from '@modules/logger/constants'
import { Environment } from '../constants'

export interface Env {
  development: boolean
  test: boolean
  beta: boolean
  production: boolean
  mongo: {
    url: string
  }
  port: number
  apiKey: string
  loggerLevel: LoggerLevel
  todoAppApiUrl: string
  sentry: {
    dns: string
    isEnabled: boolean
  }
  environment: Environment
}
