export interface RequestScope {
  user?: {
    [key: string]: any
    ip?: string
    name?: string
    type?: string
  }
  request?: any
  context?: {
    [key: string]: any
    requestId?: string
  }
}
