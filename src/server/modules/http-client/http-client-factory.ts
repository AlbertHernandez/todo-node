import {
  HttpClientFactory,
  HttpClientOptions,
  HttpClient as IHttpClient
} from './interfaces'
import { HttpClient } from './http-client'

export const httpClientFactory: HttpClientFactory = {
  get: (options: HttpClientOptions = {}): IHttpClient => {
    return new HttpClient(options)
  }
}
