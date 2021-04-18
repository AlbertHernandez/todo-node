import * as Axios from "axios";
import axios from "axios";

import {
  HttpClient as IHttpClient,
  HttpClientOptions,
  ResponseSchema,
} from "./interfaces";

export class HttpClient implements IHttpClient {
  axios;

  constructor(dependencies: HttpClientOptions = {}) {
    this.axios = axios.create({
      baseURL: dependencies.baseUrl,
      timeout: dependencies.timeout,
      headers: dependencies.headers,
    });
  }

  async delete(url: string, payload: any) {
    const rawResponse = await this.axios.delete(url, payload);

    return this.normalizeResponse(rawResponse);
  }

  async get(url: string, payload: any) {
    const rawResponse = await this.axios.get(url, payload);

    return this.normalizeResponse(rawResponse);
  }

  async patch(url: string, payload: any) {
    const rawResponse = await this.axios.patch(url, payload);

    return this.normalizeResponse(rawResponse);
  }

  async post(url: string, payload: any) {
    const rawResponse = await this.axios.post(url, payload);

    return this.normalizeResponse(rawResponse);
  }

  async put(url: string, payload: any) {
    const rawResponse = await this.axios.put(url, payload);

    return this.normalizeResponse(rawResponse);
  }

  private normalizeResponse(rawResponse: Axios.AxiosResponse): ResponseSchema {
    return {
      data: rawResponse.data,
      status: rawResponse.status,
    };
  }
}
