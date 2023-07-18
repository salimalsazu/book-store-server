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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Read = exports.ReadListSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReadListSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "book",
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        default: "Currently Reading",
    },
}, {
    timestamps: true,
});
exports.ReadListSchema.statics.isReadListExist = function (payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const wishlist = yield exports.Read.findOne({
            bookId: payload.bookId,
            userId: payload.userId,
        });
        return wishlist;
    });
};
// export model
exports.Read = (0, mongoose_1.model)("ReadList", exports.ReadListSchema);
