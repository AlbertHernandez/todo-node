import { LoggerLevel } from "../../modules/logger/enums";
import { Environment } from "./enums";

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
  todoAppApiUrl: string;
  sentry: {
    dns: string;
    isEnabled: boolean;
  };
  environment: Environment;
}
