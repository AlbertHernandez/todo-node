import Router from 'koa-router';
import { UserType } from '@server/api/constants';

import * as accountsSchema from './schemas';
import {
  authorizationMiddleware,
  requestHandlerMiddleware,
  schemaValidationMiddleware,
} from '@server/api/middlewares/router-middlewares';

const accountsRouter = new Router({
  prefix: '/api/v1/accounts',
});

accountsRouter.get(
  '/:email',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  schemaValidationMiddleware(accountsSchema.getAccountSchema),
  requestHandlerMiddleware(['accountsController', 'get']),
);

accountsRouter.get(
  '/',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  schemaValidationMiddleware(accountsSchema.getAllAccountsSchema),
  requestHandlerMiddleware(['accountsController', 'getAll']),
);

accountsRouter.post(
  '/',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  schemaValidationMiddleware(accountsSchema.createAccountSchema),
  requestHandlerMiddleware(['accountsController', 'create']),
);

accountsRouter.delete(
  '/:id',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  schemaValidationMiddleware(accountsSchema.removeAccountSchema),
  requestHandlerMiddleware(['accountsController', 'remove']),
);

accountsRouter.delete(
  '/',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  requestHandlerMiddleware(['accountsController', 'removeAll']),
);

export { accountsRouter };
