import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { IBook } from "./books.interface";
import { Books } from "./books.model";

//Create Book Service
const createBookService = async (payload: IBook): Promise<IBook> => {
  // //getting user
  // const userData = await Books.findById(payload.seller);

  //User Role Check
  // if (userData?.role === 'seller') {
  //   const result = await CowProduct.create(payload);
  //   return result;
  // } else {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not a seller');
  // }

  const result = await Books.create(payload);
  return result;
};

const getAllBookService = async (): Promise<IBook[]> => {
  const result = await Books.find();
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

export const BooksService = {
  createBookService,
  getAllBookService,
  getSingleBooksService,
  deleteSingleBookService,
  updateBookService,
};
