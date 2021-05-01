export interface ErrorHandler {
  handleError: (error: Error) => Promise<void>
  isTrustedError: (error: Error) => boolean
}
