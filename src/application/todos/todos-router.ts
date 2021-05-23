import Router from 'koa-router';

import * as todosSchema from './schemas';
import * as routerMiddleware from '@middlewares/router-middlewares';
import { UserType } from '@server/api/constants';

const todosRouter = new Router({
  prefix: '/api/v1',
});

todosRouter.get(
  '/todos',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchema.getTodosSchema),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'get']),
);

todosRouter.post(
  '/todos',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchema.createTodoSchema),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'create']),
);

todosRouter.delete(
  '/todos/:id',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchema.removeTodoSchema),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'remove']),
);

todosRouter.delete(
  '/todos',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'removeAll']),
);

export { todosRouter };
