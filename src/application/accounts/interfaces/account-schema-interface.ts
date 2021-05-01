import mongoose from 'mongoose'

export interface AccountSchema extends mongoose.Document {
  id: string
  name: string
  email: string
  createdAt: Date | null
  updatedAt: Date | null
}
