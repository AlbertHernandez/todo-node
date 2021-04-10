import { UserName, Middleware, UserType } from "../types";
import { AwilixContainer } from "awilix";
import { Env } from "../../config/environment/types";

type User = {
  key: string;
  name: UserName;
  type: UserType;
};

const getUsers = (container: AwilixContainer): User[] => {
  const env: Env = container.resolve("env");

  return [
    {
      key: env.apiKey,
      name: UserName.GENERIC_API_USER,
      type: UserType.API,
    },
  ];
};

export const authenticationMiddleware: Middleware = (
  container: AwilixContainer
) => async (ctx, next) => {
  const users = getUsers(container);
  const apiKey = ctx.get("api-key");

  const user = users.find((user) => user.key === apiKey);

  ctx.session = {
    user: user
      ? {
          type: user.type,
          name: user.name,
        }
      : null,
  };

  await next();
};
