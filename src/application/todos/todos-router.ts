import Router from 'koa-router'

import { todosSchemaValidation } from './todos-schema-validation'
import * as routerMiddleware from '../../server/api/middlewares/router-middlewares'
import { UserType } from '../../server/api/constants'

const todosRouter = new Router({
  prefix: '/api/v1'
})

todosRouter.get(
  '/todos',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchemaValidation.get),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'get'])
)

todosRouter.put(
  '/todo',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchemaValidation.create),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'create'])
)

todosRouter.delete(
  '/todo/:id',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.schemaValidationMiddleware(todosSchemaValidation.remove),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'remove'])
)

todosRouter.delete(
  '/todos',
  routerMiddleware.authorizationMiddleware({
    allowedUserTypes: [UserType.Api]
  }),
  routerMiddleware.requestHandlerMiddleware(['todosController', 'removeAll'])
)

export { todosRouter }
