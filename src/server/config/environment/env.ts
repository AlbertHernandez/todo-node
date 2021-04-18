import dotenv from "dotenv";
import { Env } from "./interfaces";
import { LoggerLevel } from "../../modules/logger/enums";
import { Environment } from "./enums";

dotenv.config();

const isNodeEnv = (env: Environment) => process.env.NODE_ENV === env;

const getLoggerLevel = (): LoggerLevel => {
  const loggerLevel = process.env.LOGGER_LEVEL || "";
  const loggerLevels: string[] = Object.values(LoggerLevel);

  return loggerLevels.includes(loggerLevel)
    ? (loggerLevel as LoggerLevel)
    : LoggerLevel.Info;
};

const getEnvironment = (): Environment => {
  const environment = process.env.NODE_ENV || "";
  const environments: string[] = Object.values(Environment);

  return environments.includes(environment)
    ? (environment as Environment)
    : Environment.Development;
};

export const env: Env = {
  development: isNodeEnv(Environment.Development),
  test: isNodeEnv(Environment.Test),
  beta: isNodeEnv(Environment.Beta),
  production: isNodeEnv(Environment.Production),
  mongo: {
    url: process.env.MONGO_URI || "",
  },
  port: Number(process.env.PORT) || 3000,
  apiKey: process.env.API_KEY || "",
  loggerLevel: getLoggerLevel(),
  todoAppApiUrl: process.env.TODO_APP_API_URL || "",
  sentry: {
    dns: process.env.SENTRY_DSN || "",
  },
  environment: getEnvironment(),
};
