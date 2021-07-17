export interface OutputMessage {
  payload: any;
  metadata: {
    messageId: string;
    publishTime: string;
  };
}
