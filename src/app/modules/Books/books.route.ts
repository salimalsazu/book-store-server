import express from "express";
import { BooksController } from "./books.controller";

const router = express.Router();

router.post("/", BooksController.createBookController);

router.get("/", BooksController.getAllBookController);

router.get("/mybooks", BooksController.getMyBookController);

router.get("/:id", BooksController.getSingleBooksController);

router.delete("/:id", BooksController.deleteBookController);

router.patch("/:id", BooksController.updateBookController);

router.post("/reviews/:id", BooksController.createMyReview);

router.get("/reviews/:id", BooksController.getMyReviewController);

export const BookRoutes = router;
