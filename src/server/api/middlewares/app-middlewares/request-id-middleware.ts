import requestId from "koa-requestid";
import { AppMiddleware } from "./types";

export const requestIdMiddleware: AppMiddleware = () => requestId();
