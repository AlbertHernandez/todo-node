import { LogMessage } from './log-message-interface';

export type LogMethod = (message: LogMessage | string) => void;
