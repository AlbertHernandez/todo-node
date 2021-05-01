import { AppMiddleware } from './interfaces'
import { UserName, UserType } from '../../constants'
import { Env } from '@config/environment/interfaces'
import { App } from '@server/interfaces'
import { ApiUser } from '../../interfaces'

const getUsers = (app: App): ApiUser[] => {
  const env: Env = app.env
  return [
    {
      key: env.apiKey,
      name: UserName.GenericApiUser,
      type: UserType.Api
    }
  ]
}

export const authenticationMiddleware: AppMiddleware = (app) =>
  async function authenticationMiddleware (ctx, next) {
    const users = getUsers(app)
    const apiKey = ctx.get('api-key')

    const user = users.find((user) => user.key === apiKey) ?? null

    ctx.session = {
      user
    }

    await next()
  }
