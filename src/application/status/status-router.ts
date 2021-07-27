import Router from 'koa-router';

import { UserType } from '../../server/api/constants';
import {
  authorizationMiddleware,
  requestHandlerMiddleware,
} from '../../server/api/middlewares/router-middlewares';

const statusRouter = new Router();

statusRouter.get(
  '/health',
  authorizationMiddleware({
    allowedUserTypes: [UserType.Api],
  }),
  requestHandlerMiddleware(['statusController', 'health']),
);

export { statusRouter };
