import { registerTodosDependencies } from './todos';
import { registerAccountsDependencies } from './accounts';
import { AppDependencies } from '@plugins/interfaces/plugin-interface';

export const appDependencies: AppDependencies[] = [
  registerTodosDependencies,
  registerAccountsDependencies,
];
