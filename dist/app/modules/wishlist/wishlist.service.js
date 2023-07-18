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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const wishlist_modal_1 = require("./wishlist.modal");
const books_model_1 = require("../Books/books.model");
//Create Book Service
const createWishService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isWishListExist = yield wishlist_modal_1.Wish.isWishListExist(payload);
    if (isWishListExist) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, "You have already added this book on your wishlist !!");
    }
    const isBookExist = yield books_model_1.Books.findOne({ _id: payload.bookId });
    if (!isBookExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Book is not found!!");
    }
    const result = (yield (yield wishlist_modal_1.Wish.create(payload)).populate("bookId")).populate("userId");
    return result;
});
const getMyWishService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //getting user
    const session = yield mongoose_1.default.startSession();
    let allWish = null;
    try {
        session.startTransaction();
        // check user exist or not
        const isUserExist = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        if (!isUserExist) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "User does not exist !");
        }
        const { email, _id } = isUserExist;
        //  check email
        if (email || _id) {
            allWish = yield wishlist_modal_1.Wish.find({ userId: _id })
                .populate("bookId")
                .populate("userId");
        }
        if (!(allWish === null || allWish === void 0 ? void 0 : allWish.length)) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "No Wish Found !!");
        }
        //
        yield session.commitTransaction();
        yield session.endSession();
        return allWish;
    }
    catch (error) {
        // err
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
exports.WishService = {
    createWishService,
    getMyWishService,
};
