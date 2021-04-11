import { UserName, Middleware, UserType } from "../types";
import { IApp } from "../../interfaces";

type User = {
  key: string;
  name: UserName;
  type: UserType;
};

const getUsers = (app: IApp): User[] => {
  return [
    {
      key: app.env.apiKey,
      name: UserName.GENERIC_API_USER,
      type: UserType.API,
    },
  ];
};

export const authenticationMiddleware: Middleware = (app: IApp) => async (
  ctx,
  next
) => {
  const users = getUsers(app);
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
