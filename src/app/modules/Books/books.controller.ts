import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { BooksService } from "./books.service";
import { IBook, IReview } from "./books.interface";
import pick from "../../../shared/pick";
import { BooksFilterAbleFields } from "./books.constant";

//Create Books Controller
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

//Get All Books Controller
const getAllBookController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BooksFilterAbleFields);

  console.log(filters);
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

const getMyBookController = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  console.log("token", token);
  const result = await BooksService.getMyBookService(token as string);

  console.log("result", result);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Books get Successfully",
    data: result,
  });
});

const createMyReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const newReview: IReview = req.body;

  const result = await BooksService.createReviewService(id, newReview);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New review added successfully !!",
    data: result,
  });
});

const getMyReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BooksService.getMyReviewsService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Book get Successfully",
      data: result,
    });
  }
);

export const BooksController = {
  createBookController,
  getAllBookController,
  getSingleBooksController,
  deleteBookController,
  updateBookController,
  getMyBookController,
  createMyReview,
  getMyReviewController,
};
