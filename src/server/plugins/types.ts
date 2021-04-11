import { IApp } from "../interfaces";

export type Plugin = (app: IApp) => Promise<void>;
