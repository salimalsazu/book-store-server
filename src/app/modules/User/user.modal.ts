import { Schema, model } from "mongoose";
import { IUser, IUserExist, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

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

userSchema.statics.isUserExist = async function (
  email: string
): Promise<
  Partial<Pick<IUserExist, "_id" | "password" | "name" | "email"> | null>
> {
  const user = await User.findOne(
    { email },
    { email: 1, name: 1, password: 1 }
  );

  console.log("from login", user);
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  console.log("pasword.....", isMatched);

  return isMatched;
};

userSchema.pre("save", async function (next) {
  ///hasing User Password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
