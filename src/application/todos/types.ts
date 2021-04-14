import mongoose from "mongoose";
import { TodoSchema } from "./interfaces";

export type TodoDataModel = mongoose.Model<TodoSchema>;
