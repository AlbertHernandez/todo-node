export class ApplicationError extends Error {
  code: string;
  meta?: Record<string, unknown>;
  status?: number | string;

  constructor(
    message: string,
    status: number | string = 500,
    code?: string,
    meta?: Record<string, unknown>
  ) {
    super(message);

    this.status = status;
    this.meta = meta;
    this.code = code || "error.application.unexpected";

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
