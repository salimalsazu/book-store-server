import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IBook } from "../Books/books.interface";
import { WishService } from "./wishlist.service";

//Create Wish Controller
const createWishController = catchAsync(async (req: Request, res: Response) => {
  const details = req.body;
  console.log(details);
  const result = await WishService.createWishService(details);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to Wishlist successfully !!",
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
    message: "All Wish get Successfully",
    data: result,
  });
});

export const WishController = {
  getAllWishController,
  createWishController,
};
