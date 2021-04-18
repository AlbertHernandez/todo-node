import * as Koa from "koa";

export interface ErrorTracker {
  trackError: (error: Error, context?: any) => Promise<void>;
  configureRequestScope: (ctx: Koa.Context) => void;
}
