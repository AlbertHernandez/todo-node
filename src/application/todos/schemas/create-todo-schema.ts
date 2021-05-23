import Joi from '@hapi/joi'

export const createTodoSchema = {
  body: Joi.object({
    author: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    isCompleted: Joi.boolean().required()
  })
}
