import Joi from "@hapi/joi";

export const todosSchemaValidation = {
  getTodos: {
    body: Joi.object({
      author: Joi.string(),
      isCompleted: Joi.boolean(),
    }),
  },
  createTodo: {
    body: Joi.object({
      author: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      isCompleted: Joi.boolean().required(),
    }),
  },
};
