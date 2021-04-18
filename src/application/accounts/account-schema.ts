import mongoose from 'mongoose'

export const accountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
)

accountSchema.index(
  {
    email: 1
  },
  {
    unique: true
  }
)
