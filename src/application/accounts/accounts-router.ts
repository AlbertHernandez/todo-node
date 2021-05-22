import Router from 'koa-router'
import { UserType } from '@server/api/constants'

import * as routerMiddleware from '@middlewares/router-middlewares'
import { accountsSchemaValidation } from './schemas/accounts-schema-validation'

const accountsRouter = new Router({
  prefix: '/api/v1'
})

accountsRouter.get(
  '/accounts/:email',
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

accountsRouter.post(
  '/accounts',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(accountsSchemaValidation.create),
  routerMiddleware.requestHandlerMiddleware(['accountsController', 'create'])
)

accountsRouter.delete(
  '/accounts/:id',
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
