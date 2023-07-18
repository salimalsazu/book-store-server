import { Model, Types, ObjectId } from "mongoose";
import { IBook } from "../Books/books.interface";
import { IUser } from "../User/user.interface";

export interface IWishList {
  _id?: Types.ObjectId;
  bookId: Types.ObjectId | IBook | null;
  userId: Types.ObjectId | IUser;
}

export interface IWishListExist {
  _id: Types.ObjectId | null;
  bookId: Types.ObjectId | IBook | null;
  userId: Types.ObjectId | IUser | null;
}

export interface IDetails {
  userId: string;
  bookId: string;
}
export interface WishListModel extends Model<IWishList> {
  isWishListExist(payload: IDetails): Promise<IWishListExist>;
}
