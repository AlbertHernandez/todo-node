import * as Koa from "koa";
import { UserType } from "../../enums";
import { ApiUser } from "../../interfaces";

export const authorizationMiddleware = ({
  allowedUserTypes,
}: {
  allowedUserTypes: UserType[];
}) =>
  async function authorizationMiddleware(ctx: Koa.Context, next: Koa.Next) {
    const user: ApiUser | null = ctx.session.user;

    const isAllowedUser = user && allowedUserTypes.includes(user.type);

    if (!user || !isAllowedUser) {
      ctx.throw(401, "Unauthorized");
    }

    await next();
  };