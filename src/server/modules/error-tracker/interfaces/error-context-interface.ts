import { HttpStatusCode } from '../../../api/enums'

export interface ErrorContext {
  'Operational Error': boolean
  Code: string
  Status?: HttpStatusCode
  Meta?: any
}
