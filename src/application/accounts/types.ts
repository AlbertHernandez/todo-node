import mongoose from 'mongoose'
import { AccountSchema } from './interfaces'

export type AccountDataModel = mongoose.Model<AccountSchema>
