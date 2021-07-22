import joi from '@hapi/joi';
import { Environment } from 'src/server/config/environment/constants';
import { LoggerLevel } from 'src/server/modules/logger/constants';

export const envSchema: joi.Schema = joi.object({
  NODE_ENV: joi
    .string()
    .valid(...Object.values(Environment))
    .required(),
  LOGGER_LEVEL: joi
    .string()
    .valid(...Object.values(LoggerLevel))
    .required(),
  MONGO_URI: joi.string().required(),
  PORT: joi.number(),
  API_KEY: joi.string().required(),
  TODO_APP_API_URL: joi.string().required(),
  SENTRY_DSN: joi.string(),
  IS_ENABLE_SENTRY: joi.string().valid('true', 'false'),
  CLIENT_MESSAGE_PROJECT_ID: joi.string().required(),
  IS_ENABLE_MESSAGE_LISTENER_CLIENT: joi
    .string()
    .valid('true', 'false')
    .required(),
});
