import { Schema, model } from "mongoose";
import { BookModel, IBook, IReview } from "./books.interface";

const reviewsSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    image: { type: String },
    description: { type: String, required: true },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

export const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    reviews: {
      type: [reviewsSchema],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Books = model<IBook, BookModel>("book", BookSchema);
