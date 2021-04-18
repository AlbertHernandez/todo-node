import * as Awilix from "awilix";
import { Env } from "../config/environment/interfaces";

import { Plugin } from "./interfaces";
import { ConfigurationError } from "../errors";
import { SentryErrorTracker } from "../modules/error-tracker";

export const sentryPlugin: Plugin = async (app) => {
  app.logger.trace("Starting Sentry Plugin...");
  const env: Env = app.env;

  if (env.sentry.isEnabled && !env.sentry.dns) {
    throw new ConfigurationError(
      "Setting sentry plugin but no Sentry DNS configured",
      "error.configuration.noMongoUrl"
    );
  }

  app.container.register({
    errorTracker: Awilix.asClass(SentryErrorTracker).setLifetime(
      Awilix.Lifetime.SINGLETON
    ),
  });

  app.logger.trace("Finalization Sentry Plugin!");
};
