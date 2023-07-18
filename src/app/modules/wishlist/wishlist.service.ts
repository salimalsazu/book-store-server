import mongoose from "mongoose";
import { IBook } from "../Books/books.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { Wish } from "./wishlist.modal";
import { IDetails, IWishList } from "./wishlist.interface";
import { Books } from "../Books/books.model";

//Create Book Service
const createWishService = async (
  payload: IDetails
): Promise<IWishList | null> => {
  const isWishListExist = await Wish.isWishListExist(payload);

  if (isWishListExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have already added this book on your wishlist !!"
    );
  }

  const isBookExist = await Books.findOne({ _id: payload.bookId });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found!!");
  }

  const result = (
    await (await Wish.create(payload)).populate("bookId")
  ).populate("userId");

  return result;
};

const getMyWishService = async (token: string): Promise<IWishList[] | null> => {
  //getting user
  const session = await mongoose.startSession();
  let allWish = null;
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

    //  check email
    if (email || _id) {
      allWish = await Wish.find({ userId: _id })
        .populate("bookId")
        .populate("userId");
    }

    if (!allWish?.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "No Wish Found !!");
    }
    //
    await session.commitTransaction();
    await session.endSession();
    return allWish;
  } catch (error) {
    // err
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const WishService = {
  createWishService,
  getMyWishService,
};
