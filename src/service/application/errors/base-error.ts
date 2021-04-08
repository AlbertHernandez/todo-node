export class BaseError extends Error {
  code: string;
  meta?: Record<string, unknown>;

  constructor(message: string, code?: string, meta?: Record<string, unknown>) {
    super(message);

    this.meta = meta;
    this.code = code || "error.api.unexpected";

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
