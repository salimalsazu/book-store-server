import mongoose from "mongoose";
import { IBook } from "../Books/books.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { Wish } from "./wishlist.modal";

//Create Book Service
const createBookService = async (payload: IBook): Promise<IBook> => {
  const result = await Wish.create(payload);
  console.log(result);
  return result;
};

const getMyBookService = async (token: string): Promise<IBook[] | null> => {
  //getting user

  const session = await mongoose.startSession();
  let allBooks = null;
  try {
    session.startTransaction();
    // check user exist or not
    const isUserExist = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "User does not exist !");
    }

    const { email, _id } = isUserExist;

    console.log(isUserExist);
    //  check email
    if (email || _id) {
      allBooks = await Wish.find({ userId: _id });
    }

    if (!allBooks?.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "No Books Found !!");
    }
    //
    await session.commitTransaction();
    await session.endSession();
    return allBooks;
  } catch (error) {
    // err
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
