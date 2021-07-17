import { OutputMessage } from '@server/modules/message-client/interfaces';

export interface MessageListenerClassHandler {
  handleMessage: (message: OutputMessage) => Promise<void>;
}
