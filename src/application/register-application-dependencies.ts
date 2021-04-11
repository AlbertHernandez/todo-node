import * as Awilix from "awilix";
import { Plugin } from "../server/plugins/types";
import { ILogger } from "../server/modules/logger/interfaces";
import { registerTodosDependencies } from "./todos";
import { registerAccountsDependencies } from "./accounts";
import { IApp } from "../server/interfaces";

export const registerApplicationDependencies: Plugin = async (app: IApp) => {
  const logger: ILogger = app.container.resolve("logger");
  logger.info("Registration of application dependencies...");

  await registerTodosDependencies(app);
  await registerAccountsDependencies(app);

  logger.info("Registration of application dependencies completed!");
};
