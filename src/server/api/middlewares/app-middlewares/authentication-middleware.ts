import { App } from "../../../interfaces";
import { Env } from "../../../config/environment/interfaces";
import { AppMiddleware } from "./interfaces";
import { UserName, UserType } from "../../enums";

type User = {
  key: string;
  name: UserName;
  type: UserType;
};

const getUsers = (app: App): User[] => {
  const env: Env = app.env;
  return [
    {
      key: env.apiKey,
      name: UserName.GENERIC_API_USER,
      type: UserType.API,
    },
  ];
};

export const authenticationMiddleware: AppMiddleware = (app) =>
  async function authenticationMiddleware(ctx, next) {
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
