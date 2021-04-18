import * as Koa from "koa";
import * as Sentry from "@sentry/node";
import { Severity } from "@sentry/node";
import { Env } from "../../config/environment/interfaces";
import { ErrorTracker as IErrorTracker } from "./interfaces";
import { ApiUser } from "../../api/interfaces";
import { BaseError } from "../../errors";
import { ClientError, TooManyRequestsError } from "../../api/errors";
import { ApplicationError } from "../../../application/errors";

export class ErrorTracker implements IErrorTracker {
  constructor(dependencies: { env: Env }) {
    Sentry.init({
      environment: dependencies.env.environment,
      dsn: dependencies.env.sentry.dns,
      tracesSampleRate: 1.0,
      serverName: "Todo Node",
    });
  }

  configureRequestScope(ctx: Koa.Context) {
    const { requestId } = ctx.scope.resolve("requestContext");
    const user: ApiUser | null = ctx.session && ctx.session.user;

    Sentry.configureScope((scope) => {
      scope.addEventProcessor((event) => {
        const normalizedRequest = {
          ...ctx.request,
          headers: {
            ...ctx.request.headers,
            "api-key": undefined,
          },
        };
        return Sentry.Handlers.parseRequest(event, normalizedRequest);
      });
      scope.setContext("Request", {
        requestId,
      });
      scope.setUser({
        ip_address: ctx.ip,
        username: user ? user.name : undefined,
        type: user ? user.type : undefined,
      });
    });
  }

  private getErrorContext(error: Error) {
    if (error instanceof BaseError) {
      return {
        "Operational Error": error.isOperational,
        Code: error.code,
        Status: error.status,
        Meta: error.meta || {},
      };
    }

    return {
      "Operational Error": false,
      Code: "error.generic",
    };
  }

  private getErrorSeverity(error: Error): Severity {
    if (error instanceof TooManyRequestsError) {
      return Severity.Warning;
    }

    if (error instanceof ClientError) {
      return Severity.Info;
    }

    if (error instanceof ApplicationError) {
      return Severity.Error;
    }

    if (error instanceof BaseError) {
      return Severity.Error;
    }

    return Severity.Fatal;
  }

  async trackError(error: Error) {
    const captureContext = {
      contexts: {
        "Error Context": this.getErrorContext(error),
      },
      level: this.getErrorSeverity(error),
    };

    Sentry.captureException(error, captureContext);
  }
}
