import { MessageListenerClientConfig } from '@modules/message-listener-client/interfaces';

export const messageListenerClientConfig: MessageListenerClientConfig = [
  {
    subscriptionName: 'todo-created-email',
    handlerClass: 'todoCreatedEmailEventController',
  },
];
