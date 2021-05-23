import { ObjectSchema } from '@hapi/joi';

export interface SchemasConfig {
  body?: ObjectSchema;
  query?: ObjectSchema;
  headers?: ObjectSchema;
  params?: ObjectSchema;
}
