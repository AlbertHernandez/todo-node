import { UserName, UserType } from '../enums'

export interface ApiUser {
  type: UserType
  name: UserName
  key: string
}
