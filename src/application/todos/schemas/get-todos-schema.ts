import Joi from '@hapi/joi';

export const getTodosSchema = {
  body: Joi.object({
    author: Joi.string(),
    isCompleted: Joi.boolean(),
  }),
};
