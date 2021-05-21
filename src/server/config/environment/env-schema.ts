import joi from '@hapi/joi'
import { Environment } from '@config/environment/constants'
import { LoggerLevel } from '@modules/logger/constants'

export const envSchema: joi.Schema = joi.object({
  NODE_ENV: joi.string().valid(...Object.values(Environment)).required(),
  LOGGER_LEVEL: joi.string().valid(...Object.values(LoggerLevel)).required(),
  MONGO_URI: joi.string().required(),
  PORT: joi.number(),
  API_KEY: joi.string().required(),
  TODO_APP_API_URL: joi.string().required(),
  SENTRY_DSN: joi.string(),
  IS_ENABLE_SENTRY: joi.string().valid('true', 'false')
})
