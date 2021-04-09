import Joi from "@hapi/joi";
import { TodoValues } from "./types";

export const todosSchemaValidation = {
  getTodos: {
    body: Joi.object({
      [TodoValues.AUTHOR]: Joi.string(),
      [TodoValues.IS_COMPLETED]: Joi.boolean(),
    }),
  },
  createTodo: {
    body: Joi.object({
      [TodoValues.ID]: Joi.string().required(),
      [TodoValues.AUTHOR]: Joi.string().required(),
      [TodoValues.TITLE]: Joi.string().required(),
      [TodoValues.CONTENT]: Joi.string().required(),
      [TodoValues.IS_COMPLETED]: Joi.boolean().required(),
    }),
  },
};
