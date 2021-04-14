import mongoose from "mongoose";

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);
