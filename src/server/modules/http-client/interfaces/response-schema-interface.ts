import { HttpStatusCode } from '../../../api/enums'

export interface ResponseSchema {
  data: any
  status: HttpStatusCode
}
