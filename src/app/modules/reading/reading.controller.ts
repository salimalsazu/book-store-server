import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReadService } from "./reading.service";

//Create Wish Controller
const createReadController = catchAsync(async (req: Request, res: Response) => {
  const details = req.body;
  const result = await ReadService.createReadService(details);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to List successfully For Reading...!!",
    data: result,
  });
});

//Get All Books Controller
const getAllReadController = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  const result = await ReadService.getMyReadService(token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Wish get Successfully",
    data: result,
  });
});

const updateReadController = catchAsync(async (req: Request, res: Response) => {
  const details = req.body;
  const result = await ReadService.updateMyReadService(details);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reading list updated successfully !!",
    data: result,
  });
});

export const ReadController = {
  getAllReadController,
  createReadController,
  updateReadController,
};
