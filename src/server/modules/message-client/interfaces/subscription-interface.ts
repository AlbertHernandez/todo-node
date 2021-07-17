import { OutputMessage } from './output-message-interface';

export interface Subscription {
  subscription: string;
  processFunc: (message: OutputMessage) => Promise<void>;
}
