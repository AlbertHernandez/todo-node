import { Env } from '../config/environment/interfaces'

import { Plugin } from './interfaces'
import { ConfigurationError } from '../errors'
import { connectMongo } from '../modules/mongo'

export const mongoPlugin: Plugin = async (app) => {
  app.logger.trace('Starting Mongo Plugin...')
  const env: Env = app.env

  if (env.mongo.url === '') {
    throw new ConfigurationError(
      'Setting mongo plugin but no Mongo Url configured',
      'error.configuration.noMongoUrl'
    )
  }

  await connectMongo(app.logger, env.mongo.url)

  app.logger.trace('Finalization Mongo Plugin!');
}
