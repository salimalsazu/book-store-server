import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

export const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
    select: 0,
  },
});

export const User = model<IUser, UserModel>("User", userSchema);
