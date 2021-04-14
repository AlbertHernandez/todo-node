import mongoose from "mongoose";
import { Env } from "../config/environment/interfaces";

import { Plugin } from "./interfaces";
import { ConfigurationError } from "../errors";
import * as Awilix from "awilix";

export const mongoPlugin: Plugin = async (app) => {
  app.logger.trace("Registration of mongo db...");
  const env: Env = app.env;

  if (!env.mongo.url) {
    throw new ConfigurationError(
      "Setting mongo plugin but no Mongo Url configured",
      "error.configuration.noMongoUrl"
    );
  }

  mongoose.Promise = global.Promise;

  mongoose.connection.on("connecting", function () {
    app.logger.trace("MongoDB: Connecting");
  });

  mongoose.connection.on("error", function () {
    app.logger.error("MongoDB: Error");
    mongoose.disconnect();
  });

  mongoose.connection.on("open", function () {
    app.logger.info("MongoDB: Connected");
  });

  mongoose.connection.on("reconnected", function () {
    app.logger.info("MongoDB: Connection Restablished");
  });

  mongoose.connection.on("disconnected", function () {
    app.logger.error("MongoDB: Disconnected");
  });

  await mongoose.connect(env.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.container.register({
    mongoose: Awilix.asValue(mongoose),
  });

  app.logger.trace("Registration of mongo db completed!");
};
