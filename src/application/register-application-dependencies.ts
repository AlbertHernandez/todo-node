import { registerTodosDependencies } from './todos';
import { registerAccountsDependencies } from './accounts';
import { registerEmailDependencies } from './emails';
import { AppDependencies } from 'src/server/plugins/interfaces/plugin-interface';

export const appDependencies: AppDependencies[] = [
  registerTodosDependencies,
  registerAccountsDependencies,
  registerEmailDependencies,
];
