import mongoose from "mongoose";
import { IBook } from "../Books/books.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

import { Books } from "../Books/books.model";
import { IDetails, IReadList } from "./reading.interface";
import { Read } from "./reading.modal";

//Create Book Service
const createReadService = async (
  payload: IDetails
): Promise<IReadList | null> => {
  const isReadListExist = await Read.isReadListExist(payload);

  if (isReadListExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have already added this book on your List !!"
    );
  }

  const isBookExist = await Books.findOne({ _id: payload.bookId });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found!!");
  }

  const result = (
    await (await Read.create(payload)).populate("bookId")
  ).populate("userId");

  return result;
};

const getMyReadService = async (token: string): Promise<IReadList[] | null> => {
  //getting user
  const session = await mongoose.startSession();
  let allRead = null;
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
      allRead = await Read.find({ userId: _id })
        .populate("bookId")
        .populate("userId");
    }

    if (!allRead?.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "No Wish Found !!");
    }
    //
    await session.commitTransaction();
    await session.endSession();
    return allRead;
  } catch (error) {
    // err
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const updateMyReadService = async (
  payload: IDetails
): Promise<IReadList | null> => {
  const isReadingListExist = await Read.isReadListExist(payload);

  if (!isReadingListExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have not  added this book on your Reading list !!"
    );
  }

  const isBookExist = await Books.findOne({ _id: payload.bookId });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found!!");
  }

  // const result = await ReadingLists.findOneAndUpdate(payload);
  const result = await Read.findOneAndUpdate(payload, {
    $set: { status: "finished reading" },
  });

  return result;
};

export const ReadService = {
  createReadService,
  getMyReadService,
  updateMyReadService,
};
