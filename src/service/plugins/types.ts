import { AwilixContainer } from "awilix";

export type Plugin = (container: AwilixContainer) => Promise<void>;
