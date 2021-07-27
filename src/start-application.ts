import { getConfiguredApp } from './get-configured-application';
import { App as IApp } from './server/interfaces';

export const startApplication = async (): Promise<IApp> => {
  const app = getConfiguredApp();
  await app.start();
  return app;
};
