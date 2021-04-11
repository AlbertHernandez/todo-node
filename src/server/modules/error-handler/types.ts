import { IApp } from "../../interfaces";
import { IErrorHandler } from "../../../application/errors/interfaces";

export type ApplicationErrorHandler = {
  createErrorHandler(app: IApp): IErrorHandler;
};
