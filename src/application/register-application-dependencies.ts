import { Plugin } from "../server/plugins/interfaces";
import { registerTodosDependencies } from "./todos";
import { registerAccountsDependencies } from "./accounts";

export const registerApplicationDependencies: Plugin = async (app) => {
  app.logger.info("Registration of application dependencies...");

  await registerTodosDependencies(app);
  await registerAccountsDependencies(app);

  app.logger.info("Registration of application dependencies completed!");
};
