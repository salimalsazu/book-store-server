import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IBook } from "../Books/books.interface";

//Create Books Controller
const createWishController = catchAsync(async (req: Request, res: Response) => {
  const { ...book } = req.body;
  const result = await WishService.createWishService(book);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book is createded successfully`,
    data: result,
  });
});

//Get All Books Controller
const getAllWishController = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  const result = await WishService.getMyWishService(token as string);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Books get Successfully",
    data: result,
  });
});

export const WishController = {
  getAllWishController,
  createWishController,
};
