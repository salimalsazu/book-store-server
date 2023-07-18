import { Schema, Types, model } from "mongoose";
import {
  IDetails,
  IReadList,
  IReadListExist,
  ReadListModel,
} from "./reading.interface";

export const ReadListSchema = new Schema<IReadList, ReadListModel>(
  {
    bookId: {
      type: Types.ObjectId,
      required: true,
      ref: "book",
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "Currently Reading",
    },
  },
  {
    timestamps: true,
  }
);

ReadListSchema.statics.isReadListExist = async function (
  payload: IDetails
): Promise<IReadListExist | null> {
  const wishlist = await Read.findOne({
    bookId: payload.bookId,
    userId: payload.userId,
  });
  return wishlist;
};

// export model

export const Read = model<IReadList, ReadListModel>("ReadList", ReadListSchema);
