import { AwilixContainer, Constructor } from "awilix";

export type Request = {
  body: any;
  scope: AwilixContainer;
};

export type Handler = [Constructor<any>, string];
