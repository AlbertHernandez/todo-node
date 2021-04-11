export enum RequestValues {
  BODY = "body",
  QUERY = "query",
  HEADERS = "headers",
  PARAMS = "params",
}

export enum UserName {
  GENERIC_API_USER = "generic-api-user",
}

export enum UserType {
  API = "api",
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  INTERNAL_SERVER = 500,
}
