import Joi from "@hapi/joi";

export const accountsSchemaValidation = {
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
    }),
  },
  remove: {
    body: Joi.object({
      email: Joi.string().required(),
    }),
  },
  get: {
    body: Joi.object({
      email: Joi.string().required(),
    }),
  },
  getAll: {
    body: Joi.object({}),
  },
};
