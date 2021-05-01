import { UserName, UserType } from '../constants'

export interface ApiUser {
  type: UserType
  name: UserName
  key: string
}
