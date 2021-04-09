import Joi from "@hapi/joi";
import { TodoValues } from "./types";

export const todosSchemaValidation = {
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
