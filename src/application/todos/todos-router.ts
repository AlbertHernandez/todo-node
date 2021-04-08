import { RouterConfig } from "../../server/api/types";
import { todosSchemaValidation } from "./todos-schema-validation";

const todosRouterConfig: RouterConfig = {
  prefix: "/api/v1/todos",
  routes: {
    getTodos: {
      method: "get",
      handler: ["todosController", "getTodos"],
    },
    createTodo: {
      method: "post",
      schema: todosSchemaValidation.createTodo,
      handler: ["todosController", "createTodo"],
    },
  },
};

export { todosRouterConfig };
