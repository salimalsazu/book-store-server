"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
const reviewsSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    image: { type: String },
    description: { type: String, required: true },
    userId: { type: String },
}, {
    timestamps: true,
});
exports.BookSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Books = (0, mongoose_1.model)("book", exports.BookSchema);
