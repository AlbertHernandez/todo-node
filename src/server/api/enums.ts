export enum RequestValues {
  Body = 'body',
  Query = 'query',
  Headers = 'headers',
  Params = 'params',
}

export enum UserName {
  GenericApiUser = 'generic-api-user',
}

export enum UserType {
  Api = 'api',
}

export enum HttpStatusCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  NotAcceptable = 406,
  TooManyRequests = 429,
  InternalServer = 500,
  NotImplemented = 501,
}
