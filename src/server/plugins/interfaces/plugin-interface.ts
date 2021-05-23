import { App } from '../../interfaces';

export interface Plugin {
  use: (app: App) => Promise<void>;
}

export type AppDependencies = (app: App) => Promise<void>;
