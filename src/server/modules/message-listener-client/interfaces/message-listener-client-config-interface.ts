interface MessageListenerClientConfigItem {
  subscriptionName: string;
  handlerClass: string;
}

export type MessageListenerClientConfig = MessageListenerClientConfigItem[];
