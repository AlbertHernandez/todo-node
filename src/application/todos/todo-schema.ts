import mongoose from "mongoose";

export const todoSchema = new mongoose.Schema(
  {
    author: String,
    title: String,
    content: String,
    isCompleted: Boolean,
  },
  {
    timestamps: true,
  }
);
