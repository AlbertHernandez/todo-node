import Joi from '@hapi/joi'

export const todosSchemaValidation = {
  get: {
    body: Joi.object({
      author: Joi.string(),
      isCompleted: Joi.boolean()
    })
  },
  remove: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({})
  },
  create: {
    body: Joi.object({
      author: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      isCompleted: Joi.boolean().required()
    })
  }
}
