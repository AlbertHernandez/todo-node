import Joi from '@hapi/joi'

export const accountsSchemaValidation = {
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required()
    })
  },
  remove: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({})
  },
  get: {
    body: Joi.object({
      email: Joi.string().required()
    })
  },
  getAll: {
    body: Joi.object({})
  }
}
