import * as Koa from "koa";
import { UserType } from "../../enums";
import { UnauthorizedError } from "../../errors";
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
      throw new UnauthorizedError("Unauthorized", ctx.ip);
    }

    await next();
  };
