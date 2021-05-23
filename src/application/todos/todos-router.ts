import Router from 'koa-router';

import * as todosSchema from './schemas';
import { UserType } from '@server/api/constants';
import {
  authorizationMiddleware,
  requestHandlerMiddleware,
  schemaValidationMiddleware,
} from '@server/api/middlewares/router-middlewares';

const todosRouter = new Router({
  prefix: '/api/v1/todos',
});

todosRouter.get(
  '/',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  schemaValidationMiddleware(todosSchema.getTodosSchema),
  requestHandlerMiddleware(['todosController', 'get']),
);

todosRouter.post(
  '/',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  schemaValidationMiddleware(todosSchema.createTodoSchema),
  requestHandlerMiddleware(['todosController', 'create']),
);

todosRouter.delete(
  '/:id',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  schemaValidationMiddleware(todosSchema.removeTodoSchema),
  requestHandlerMiddleware(['todosController', 'remove']),
);

todosRouter.delete(
  '/',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  requestHandlerMiddleware(['todosController', 'removeAll']),
);

export { todosRouter };
