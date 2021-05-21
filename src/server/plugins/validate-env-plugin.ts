import { Plugin } from './interfaces/plugin-interface'
import joi from '@hapi/joi'
import { ConfigurationError } from '@server/errors'

export const validateEnvPlugin = (schema: joi.Schema): Plugin => async (app) => {
  app.logger.trace('Starting Validate Env Plugin...')

  const environment = schema.validate(process.env, { allowUnknown: true })

  if (environment.error != null) {
    throw new ConfigurationError(
      `Environment value error: ${environment.error.message}`
    )
  }

  app.logger.trace('Env values validated!')
}
