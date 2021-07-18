export interface OutputMessage {
  data: {
    id: string;
    type: string;
    occurredOn: string;
    attributes: any;
    meta: Record<string, any>;
  };
}
