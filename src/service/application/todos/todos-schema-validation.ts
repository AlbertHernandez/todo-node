import Joi from "@hapi/joi";

export const todosSchemaValidation = {
  createTodo: {
    body: Joi.object({
      id: Joi.string().required(),
      author: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      isCompleted: Joi.boolean().required(),
    }),
  },
};
