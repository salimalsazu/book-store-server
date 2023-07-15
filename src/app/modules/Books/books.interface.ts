import { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publication?: string;
  price?: number;
  image?: string;
  description?: string;
};

export type BooksFilter = {
  searchTerm?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
