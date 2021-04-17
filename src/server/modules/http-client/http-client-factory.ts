import axios from "axios";
import { HttpClientFactory, HttpClientOptions } from "./interfaces";
import { HttpClient } from "./http-client";

export const httpClientFactory: HttpClientFactory = {
  get: (options: HttpClientOptions) => {
    return new HttpClient(options);
  },
};
