import dotenv from 'dotenv';
import { LoggerLevel } from '@modules/logger/constants';
import { Environment } from './constants';
import { Env } from './interfaces';

dotenv.config();

const isNodeEnv = (env: Environment): boolean => process.env.NODE_ENV === env;

const getLoggerLevel = (): LoggerLevel => {
  const loggerLevel = process.env.LOGGER_LEVEL ?? '';
  const loggerLevels: string[] = Object.values(LoggerLevel);

  return loggerLevels.includes(loggerLevel)
    ? (loggerLevel as LoggerLevel)
    : LoggerLevel.Info;
};

const getEnvironment = (): Environment => {
  const environment = process.env.NODE_ENV ?? '';
  const environments: string[] = Object.values(Environment);

  return environments.includes(environment)
    ? (environment as Environment)
    : Environment.Development;
};

const parseStringToBoolean = (value = ''): boolean => {
  return value === 'true';
};

export const env: Env = {
  development: isNodeEnv(Environment.Development),
  test: isNodeEnv(Environment.Test),
  beta: isNodeEnv(Environment.Beta),
  production: isNodeEnv(Environment.Production),
  mongo: {
    url: process.env.MONGO_URI ?? '',
  },
  port: Number(process.env.PORT ?? 3000),
  apiKey: process.env.API_KEY ?? '',
  loggerLevel: getLoggerLevel(),
  todoAppApiUrl: process.env.TODO_APP_API_URL ?? '',
  sentry: {
    dns: process.env.SENTRY_DSN ?? '',
    isEnabled: parseStringToBoolean(process.env.IS_ENABLE_SENTRY),
  },
  environment: getEnvironment(),
};
