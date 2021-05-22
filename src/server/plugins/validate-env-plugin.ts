import { Plugin } from './interfaces/plugin-interface'
import joi from '@hapi/joi'
import { ConfigurationError } from '@server/errors'
import { App } from '@server/interfaces'

export class ValidationPlugin implements Plugin {
  schema
  config
  identifier

  constructor (dependencies: {
    schema: joi.Schema
    config: any
    identifier: string
  }) {
    this.identifier = dependencies.identifier
    this.schema = dependencies.schema
    this.config = dependencies.config
  }

  async use (app: App): Promise<void> {
    app.logger.trace(`Validating ${this.identifier} with Validation Plugin...`)

    const validation = this.schema.validate(this.config, { allowUnknown: true })

    if (validation.error != null) {
      throw new ConfigurationError(`Config error: ${validation.error.message}`)
    }

    app.logger.trace(`Validated ${this.identifier} with Validation Plugin!`)
  }
}
