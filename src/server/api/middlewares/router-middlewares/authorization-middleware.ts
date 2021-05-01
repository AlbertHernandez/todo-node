import * as Koa from 'koa'
import { HttpStatusCode, UserType } from '../../constants'
import { UnauthorizedError } from '../../errors'
import { ApiUser } from '../../interfaces'

export const authorizationMiddleware = ({
  allowedUserTypes
}: {
  allowedUserTypes: UserType[]
}) =>
  async function authorizationMiddleware (ctx: Koa.Context, next: Koa.Next) {
    const user: ApiUser | null = ctx.session.user

    const isAllowedUser = (user != null) && allowedUserTypes.includes(user.type)

    if ((user == null) || !isAllowedUser) {
      ctx.status = HttpStatusCode.Unauthorized
      throw new UnauthorizedError('Unauthorized', ctx.ip)
    }

    await next()
  }
