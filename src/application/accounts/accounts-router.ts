import Router from 'koa-router'
import { UserType } from '../../server/api/constants'

import * as routerMiddleware from '../../server/api/middlewares/router-middlewares'
import { accountsSchemaValidation } from './accounts-schema-validation'

const accountsRouter = new Router({
  prefix: '/api/v1'
})

accountsRouter.get(
  '/account',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(accountsSchemaValidation.get),
  routerMiddleware.requestHandlerMiddleware(['accountsController', 'get'])
)

accountsRouter.get(
  '/accounts',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(accountsSchemaValidation.getAll),
  routerMiddleware.requestHandlerMiddleware(['accountsController', 'getAll'])
)

accountsRouter.put(
  '/account',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(accountsSchemaValidation.create),
  routerMiddleware.requestHandlerMiddleware(['accountsController', 'create'])
)

accountsRouter.delete(
  '/account/:id',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(accountsSchemaValidation.remove),
  routerMiddleware.requestHandlerMiddleware(['accountsController', 'remove'])
)

accountsRouter.delete(
  '/accounts',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.requestHandlerMiddleware(['accountsController', 'removeAll'])
)

export { accountsRouter }
