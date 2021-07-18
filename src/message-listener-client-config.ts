import { MessageListenerClientConfig } from '@modules/message-listener-client/interfaces';

export const messageListenerClientConfig: MessageListenerClientConfig = [
  {
    subscriptionName: 'emailService.email.notifyOnTodoCreated',
    handlerClass: 'todoCreatedEmailEventController',
  },
];
