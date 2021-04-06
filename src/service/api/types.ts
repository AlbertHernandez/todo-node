export type Request = {
  body: any;
};

export type RouterHandler = (request: Request) => Promise<any>;
