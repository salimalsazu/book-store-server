import { Model, Types } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  password: string;
};

export type IUserExist = {
  password: string;
  email: string;
  name: string;
  _id: Types.ObjectId | undefined;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExist, "_id" | "email" | "name" | "password">>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
