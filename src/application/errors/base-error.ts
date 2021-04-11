import { HttpStatusCode } from "../../server/api/types";

export class BaseError extends Error {
  code: string;
  meta?: Record<string, unknown>;
  status: HttpStatusCode;
  isOperational: boolean;

  constructor(
    message: string,
    status: HttpStatusCode,
    isOperational: boolean,
    code?: string,
    meta?: Record<string, unknown>
  ) {
    super(message);

    this.status = status;
    this.isOperational = isOperational;
    this.code = code || "error.unexpected";
    this.meta = meta;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
