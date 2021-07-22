import { LoggerLevel } from 'src/server/modules/logger/constants';
import { Environment } from '../constants';

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
  messageClient: {
    projectId: string;
  };
  messageListenerClient: {
    enabled: boolean;
  };
}
