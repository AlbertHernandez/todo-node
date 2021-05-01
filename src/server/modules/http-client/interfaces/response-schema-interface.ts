import { HttpStatusCode } from '../../../api/constants'

export interface ResponseSchema {
  data: any
  status: HttpStatusCode
}
