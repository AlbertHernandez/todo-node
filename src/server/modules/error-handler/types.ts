import { IApp } from "../../interfaces";
import { IErrorHandler } from "./interfaces";

export type ApplicationErrorHandler = {
  createErrorHandler(app: IApp): IErrorHandler;
};
