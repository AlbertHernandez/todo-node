import { Context, Next } from "koa";
import { ApiUser, UserType } from "../types";

export const authorizationMiddleware = ({
  allowedUserTypes,
}: {
  allowedUserTypes: UserType[];
}) =>
  async function authorizationMiddleware(ctx: Context, next: Next) {
    const user: ApiUser | null = ctx.session.user;

    const isAllowedUser = user && allowedUserTypes.includes(user.type);

    if (!user || !isAllowedUser) {
      ctx.throw(401, "Unauthorized");
    }

    await next();
  };
