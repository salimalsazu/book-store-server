import { Schema, Types, model } from "mongoose";
import {
  IDetails,
  IWishList,
  IWishListExist,
  WishListModel,
} from "./wishlist.interface";

export const WishListSchema = new Schema<IWishList, WishListModel>(
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
  },
  {
    timestamps: true,
  }
);

WishListSchema.statics.isWishListExist = async function (
  payload: IDetails
): Promise<IWishListExist | null> {
  const wishlist = await Wish.findOne({
    bookId: payload.bookId,
    userId: payload.userId,
  });
  return wishlist;
};

// export model

export const Wish = model<IWishList, WishListModel>("WishList", WishListSchema);
