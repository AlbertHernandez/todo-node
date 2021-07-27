import { accountsRouter } from './accounts';
import { statusRouter } from './status';
import { todosRouter } from './todos';

export const applicationRouters = [todosRouter, accountsRouter, statusRouter];
