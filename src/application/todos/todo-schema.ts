import mongoose from 'mongoose'

export const todoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    isCompleted: {
      type: String,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)
