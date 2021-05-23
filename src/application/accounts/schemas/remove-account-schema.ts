import Joi from '@hapi/joi';

export const removeAccountSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({}),
};
