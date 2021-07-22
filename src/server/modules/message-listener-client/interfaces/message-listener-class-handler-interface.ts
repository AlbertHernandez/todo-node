import { OutputMessage } from 'src/server/modules/message-client/interfaces';

export interface MessageListenerClassHandler {
  handleMessage: (message: OutputMessage) => Promise<void>;
}
