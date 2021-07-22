import { OutputMessage } from '../../message-client/interfaces';

export interface MessageListenerClassHandler {
  handleMessage: (message: OutputMessage) => Promise<void>;
}
