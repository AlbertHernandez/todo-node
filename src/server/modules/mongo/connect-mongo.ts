import mongoose from "mongoose";
import { Logger } from "../logger/interfaces";

export const connectMongo = async (logger: Logger, url: string) => {
  mongoose.Promise = global.Promise;

  mongoose.connection.on("connecting", function () {
    logger.trace("MongoDB: Connecting");
  });

  mongoose.connection.on("error", function () {
    logger.error("MongoDB: Error");
    mongoose.disconnect();
  });

  mongoose.connection.on("open", function () {
    logger.info("MongoDB: Connected");
  });

  mongoose.connection.on("reconnected", function () {
    logger.info("MongoDB: Connection Restablished");
  });

  mongoose.connection.on("disconnected", function () {
    logger.error("MongoDB: Disconnected");
  });

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return mongoose;
};
