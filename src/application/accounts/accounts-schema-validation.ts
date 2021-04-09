import Joi from "@hapi/joi";

export const accountsSchemaValidation = {
  get: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  getAll: {
    body: Joi.object({}),
  },
};
