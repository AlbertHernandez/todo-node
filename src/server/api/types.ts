import { ObjectSchema } from "@hapi/joi";

export type Request = {
  body: any;
  query: any;
  headers: any;
  params: any;
};

export enum RequestValues {
  BODY = "body",
  QUERY = "query",
  HEADERS = "headers",
  PARAMS = "params",
}

export type Handler = [string, string];

export type SchemasConfig = Partial<{
  body?: ObjectSchema;
  query?: ObjectSchema;
  headers?: ObjectSchema;
  params?: ObjectSchema;
}>;

export enum UserName {
  GENERIC_API_USER = "generic-api-user",
}

export enum UserType {
  API = "api",
}

export type ApiUser = {
  type: UserType;
  name: UserName;
};

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  INTERNAL_SERVER = 500,
}
