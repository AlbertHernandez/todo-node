import { MessageListenerClientConfig } from 'src/server/modules/message-listener-client/interfaces';

export const messageListenerClientConfig: MessageListenerClientConfig = [
  {
    subscriptionName: 'emailService.email.notifyOnTodoCreated',
    handlerClass: 'todoCreatedEmailEventController',
  },
];
