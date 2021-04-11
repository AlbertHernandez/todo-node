import { App } from "../interfaces";

export interface Plugin {
  (app: App): Promise<void>;
}
