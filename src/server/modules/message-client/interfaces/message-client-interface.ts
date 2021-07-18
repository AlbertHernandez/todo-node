import { InputMessage } from './input-message-interface';
import { OutputMessage } from './output-message-interface';

export interface MessageClient {
  publish: (message: InputMessage) => Promise<void>;
  subscribe: (
    subscriptionName: string,
    processFunc: (message: OutputMessage) => Promise<void>,
  ) => void;
}
