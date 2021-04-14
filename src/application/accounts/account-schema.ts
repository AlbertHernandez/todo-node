import mongoose from "mongoose";

export const accountSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

accountSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
  }
);
