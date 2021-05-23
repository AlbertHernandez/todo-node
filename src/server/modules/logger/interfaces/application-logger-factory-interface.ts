import { App } from '../../../interfaces';
import { Logger } from './logger-interface';

export interface ApplicationLoggerFactory {
  get: (app: App) => Logger;
}
