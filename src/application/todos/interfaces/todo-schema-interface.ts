import mongoose from 'mongoose'

export interface TodoSchema extends mongoose.Document {
  id: string
  author: string
  title: string
  content: string
  isCompleted: boolean
  createdAt: Date | null
  updatedAt: Date | null
}
