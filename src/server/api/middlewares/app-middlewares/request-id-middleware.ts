import requestId from "koa-requestid";
import { AppMiddleware } from "./interfaces";

export const requestIdMiddleware: AppMiddleware = () => requestId();
