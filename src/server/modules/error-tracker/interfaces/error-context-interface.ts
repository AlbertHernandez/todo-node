import { HttpStatusCode } from '../../../api/constants'

export interface ErrorContext {
  'Operational Error': boolean
  Code: string
  Status?: HttpStatusCode
  Meta?: any
}
