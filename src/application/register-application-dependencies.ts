import { registerTodosDependencies } from './todos';
import { registerAccountsDependencies } from './accounts';
import { registerEmailDependencies } from './emails';
import { AppDependencies } from 'src/server/plugins/interfaces/plugin-interface';
import { registerStatusDependencies } from './status';

export const appDependencies: AppDependencies[] = [
  registerTodosDependencies,
  registerAccountsDependencies,
  registerEmailDependencies,
  registerStatusDependencies,
];
