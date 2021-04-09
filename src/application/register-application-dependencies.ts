import * as Awilix from "awilix";
import { Plugin } from "../server/plugins/types";
import { ILogger } from "../server/modules/logger/interfaces";
import { registerTodosDependencies } from "./todos";
import { registerAccountsDependencies } from "./accounts";

export const registerApplicationDependencies: Plugin = async (
  container: Awilix.AwilixContainer
) => {
  const logger: ILogger = container.resolve("logger");
  logger.info("Registration of application dependencies...");

  await registerTodosDependencies(container);
  await registerAccountsDependencies(container);

  logger.info("Registration of application dependencies completed!");
};
