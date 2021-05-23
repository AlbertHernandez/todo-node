// TypeScript Version: 3.0

declare module 'koa-ratelimit' {
  import Koa from 'koa';

  interface RateLimitOptions {
    driver?: 'redis' | 'memory';
    db: any;
    duration?: number;
    errorMessage?: string;
    id: (ctx: Koa.Context) => string;
    headers?: {
      remaining?: string;
      reset?: string;
      total?: string;
    };
    max?: number;
    disableHeader?: boolean;
    whitelist?: (ctx: Koa.Context) => boolean;
    blacklist?: (ctx: Koa.Context) => boolean;
    throw?: boolean;
  }

  export default function (rateLimitOptions: RateLimitOptions): any;
}
