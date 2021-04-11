import dotenv from "dotenv";
import { Env } from "./interfaces";
import { LoggerLevel } from "../../modules/logger/enums";

dotenv.config();

const isNodeEnv = (env: string) => process.env.NODE_ENV === env;

const getLoggerLevel = (): LoggerLevel => {
  const loggerLevel = process.env.LOGGER_LEVEL || "";
  const loggerLevels: string[] = Object.values(LoggerLevel);

  return loggerLevels.includes(loggerLevel)
    ? (loggerLevel as LoggerLevel)
    : LoggerLevel.Info;
};

export const env: Env = {
  development: isNodeEnv("development"),
  test: isNodeEnv("test"),
  beta: isNodeEnv("beta"),
  production: isNodeEnv("production"),
  mongo: {
    url: process.env.MONGO_URI || "",
  },
  port: Number(process.env.PORT) || 3000,
  apiKey: process.env.API_KEY || "",
  loggerLevel: getLoggerLevel(),
};
