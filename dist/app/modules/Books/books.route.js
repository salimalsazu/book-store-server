"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router.post("/", books_controller_1.BooksController.createBookController);
router.get("/", books_controller_1.BooksController.getAllBookController);
router.get("/mybooks", books_controller_1.BooksController.getMyBookController);
router.get("/:id", books_controller_1.BooksController.getSingleBooksController);
router.delete("/:id", books_controller_1.BooksController.deleteBookController);
router.patch("/:id", books_controller_1.BooksController.updateBookController);
router.post("/reviews/:id", books_controller_1.BooksController.createMyReview);
router.get("/reviews/:id", books_controller_1.BooksController.getMyReviewController);
exports.BookRoutes = router;
