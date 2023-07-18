import { Model, Types, ObjectId } from "mongoose";
import { IBook } from "../Books/books.interface";
import { IUser } from "../User/user.interface";

export interface IReadList {
  _id?: Types.ObjectId;
  bookId: Types.ObjectId | IBook | null;
  userId: Types.ObjectId | IUser;
  status: string;
}

export interface IReadListExist {
  _id: Types.ObjectId | null;
  bookId: Types.ObjectId | IBook | null;
  userId: Types.ObjectId | IUser | null;
  status: string;
}

export interface IDetails {
  userId: string;
  bookId: string;
  status: string;
}
export interface ReadListModel extends Model<IReadList> {
  isReadListExist(payload: IDetails): Promise<IReadListExist>;
}
