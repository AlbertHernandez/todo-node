import { App } from '../interfaces'

export type Plugin = (app: App) => Promise<void>
