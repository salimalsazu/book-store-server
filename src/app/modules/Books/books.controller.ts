import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { BooksService } from "./books.service";
import { IBook } from "./books.interface";
import pick from "../../../shared/pick";
import { BooksFilterAbleFields } from "./books.constant";

//Create Cow Controller
const createBookController = catchAsync(async (req: Request, res: Response) => {
  const { ...book } = req.body;

  const result = await BooksService.createBookService(book);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book is createded successfully`,
    data: result,
  });
});

//Get All Cows Controller
const getAllBookController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BooksFilterAbleFields);

  const result = await BooksService.getAllBookService(filters);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Books get Successfully",
    data: result,
  });
});

const getSingleBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BooksService.getSingleBooksService(id);
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Book get Successfully",
      data: result,
    });
  }
);

const deleteBookController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BooksService.deleteSingleBookService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book  Deleted successfully !!",
    data: result,
  });
});

const updateBookController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;

  const result = await BooksService.updateBookService(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book  Deleted successfully !!",
    data: result,
  });
});

export const BooksController = {
  createBookController,
  getAllBookController,
  getSingleBooksController,
  deleteBookController,
  updateBookController,
};
