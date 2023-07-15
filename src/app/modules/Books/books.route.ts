import express from "express";
import { BooksController } from "./books.controller";

const router = express.Router();

router.post("/", BooksController.createBookController);

router.get("/", BooksController.getAllBookController);

router.get("/:id", BooksController.getSingleBooksController);

router.delete("/:id", BooksController.deleteBookController);

router.patch("/:id", BooksController.updateBookController);

export const BookRoutes = router;
