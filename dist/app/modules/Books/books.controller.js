"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const books_service_1 = require("./books.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const books_constant_1 = require("./books.constant");
//Create Books Controller
const createBookController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = __rest(req.body, []);
    const result = yield books_service_1.BooksService.createBookService(book);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Book is createded successfully`,
        data: result,
    });
}));
//Get All Books Controller
const getAllBookController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, books_constant_1.BooksFilterAbleFields);
    console.log(filters);
    const result = yield books_service_1.BooksService.getAllBookService(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Books get Successfully",
        data: result,
    });
}));
const getSingleBooksController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BooksService.getSingleBooksService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Book get Successfully",
        data: result,
    });
}));
const deleteBookController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield books_service_1.BooksService.deleteSingleBookService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book  Deleted successfully !!",
        data: result,
    });
}));
const updateBookController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = __rest(req.body, []);
    const result = yield books_service_1.BooksService.updateBookService(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book  Deleted successfully !!",
        data: result,
    });
}));
const getMyBookController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    console.log("token", token);
    const result = yield books_service_1.BooksService.getMyBookService(token);
    console.log("result", result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Books get Successfully",
        data: result,
    });
}));
const createMyReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
    const newReview = req.body;
    const result = yield books_service_1.BooksService.createReviewService(id, newReview);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "New review added successfully !!",
        data: result,
    });
}));
const getMyReviewController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BooksService.getMyReviewsService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Book get Successfully",
        data: result,
    });
}));
exports.BooksController = {
    createBookController,
    getAllBookController,
    getSingleBooksController,
    deleteBookController,
    updateBookController,
    getMyBookController,
    createMyReview,
    getMyReviewController,
};
