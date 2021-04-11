import { LoggerLevel } from "../../modules/logger/enums";

export interface Env {
  development: boolean;
  test: boolean;
  beta: boolean;
  production: boolean;
  mongo: {
    url: string;
  };
  port: number;
  apiKey: string;
  loggerLevel: LoggerLevel;
}
