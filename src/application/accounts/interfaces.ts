import mongoose from 'mongoose'
import { Request } from '../../server/api/interfaces'

type GetAccountsMethod = (email: string) => Promise<Account | null>

type GetAllAccountsMethod = () => Promise<Account[]>

type CreateAccountMethod = (account: Account) => Promise<Account>

type RemoveAccountMethod = (id: string) => Promise<void>

type RemoveAllAccountsMethod = () => Promise<void>

export interface AccountsRepository {
  get: GetAccountsMethod
  getAll: GetAllAccountsMethod
  create: CreateAccountMethod
  remove: RemoveAccountMethod
  removeAll: RemoveAllAccountsMethod
}

export interface AccountsService {
  get: GetAccountsMethod
  getAll: GetAllAccountsMethod
  create: CreateAccountMethod
  remove: RemoveAccountMethod
  removeAll: RemoveAllAccountsMethod
}

export interface AccountsController {
  get: (request: Request) => Promise<Account | null>
  getAll: (request: Request) => Promise<Account[]>
  create: (request: Request) => Promise<Account>
  remove: (request: Request) => Promise<void>
  removeAll: (request: Request) => Promise<void>
}

export interface Account {
  id: string
  name: string
  email: string
  createdAt: Date | null
  updatedAt: Date | null
}

export interface AccountSchema extends mongoose.Document {
  id: string
  name: string
  email: string
  createdAt: Date | null
  updatedAt: Date | null
}
