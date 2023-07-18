import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { BooksFilter, IBook, IReview } from "./books.interface";
import { Books } from "./books.model";
import { IGenericResponse } from "../../../interfaces/common";
import { BooksSearchAbleFields } from "./books.constant";
import mongoose from "mongoose";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

//Create Book Service
const createBookService = async (payload: IBook): Promise<IBook> => {
  const result = await Books.create(payload);
  console.log(result);
  return result;
};

const getAllBookService = async (filters: BooksFilter): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BooksSearchAbleFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whenConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Books.find(whenConditions).sort({ createdAt: -1 });
  return result;
};

const getSingleBooksService = async (id: string): Promise<IBook | null> => {
  const result = await Books.findById(id);
  return result;
};

const deleteSingleBookService = async (id: string): Promise<IBook | null> => {
  const result = await Books.findByIdAndDelete(id);
  return result;
};

const updateBookService = async (
  id: string,
  updatedData: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Books.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is Not Found !!");
  }

  const result = await Books.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

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

    const { userEmail, _id } = isUserExist;

    console.log("user check", isUserExist);

    //  check email
    if (userEmail || _id) {
      allBooks = await Books.find({ userId: _id });
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

const createReviewService = async (
  payload: string,
  newReview: IReview
): Promise<IBook | null> => {
  if (!newReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Review is Required");
  }
  console.log(newReview, "new review is here");

  const book = await Books.findOne({ _id: payload });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  // book?.reviews?.push(newReview);
  const review = await Books.findOneAndUpdate(
    { _id: payload },
    { $push: { reviews: newReview } },
    { new: true }
  );
  return review;
};

const getMyReviewsService = async (id: string): Promise<IReview[] | null> => {
  const result = await Books.findById(id);
  return result?.reviews || [];
};

export const BooksService = {
  createBookService,
  getAllBookService,
  getSingleBooksService,
  deleteSingleBookService,
  updateBookService,
  getMyBookService,
  createReviewService,
  getMyReviewsService,
};
