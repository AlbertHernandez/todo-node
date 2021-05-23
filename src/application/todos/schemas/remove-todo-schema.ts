import Joi from '@hapi/joi'

export const removeTodoSchema = {
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({})
}
