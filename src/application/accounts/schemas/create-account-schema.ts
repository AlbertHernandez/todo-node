import Joi from '@hapi/joi';

export const createAccountSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }),
};
