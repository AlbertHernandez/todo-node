import { HttpClient } from './http-client-interface';
import { HttpClientOptions } from './http-client-options-interface';

export interface HttpClientFactory {
  get: (options?: HttpClientOptions) => HttpClient;
}
