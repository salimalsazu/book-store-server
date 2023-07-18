import { Model, Types } from "mongoose";
import { IUser } from "../User/user.interface";

export type IReview = {
  name?: string;
  email?: string;
  image?: string | undefined;
  description: string;
  userId?: Types.ObjectId | IUser;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publication: string;
  price?: number;
  image?: string;
  description?: string;
  userId?: Types.ObjectId | IUser;
  email?: string;
  name?: string;
  reviews: [IReview];
};

export type BooksFilter = {
  searchTerm?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
