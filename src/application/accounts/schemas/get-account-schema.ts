import Joi from '@hapi/joi'

export const getAccountSchema = {
  params: Joi.object({
    email: Joi.string().required()
  })
}
