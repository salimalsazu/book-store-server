"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_route_1 = require("../modules/Books/books.route");
const user_route_1 = require("../modules/User/user.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const reading_route_1 = require("../modules/reading/reading.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/books",
        route: books_route_1.BookRoutes,
    },
    {
        path: "/wish",
        route: wishlist_route_1.WishRoutes,
    },
    {
        path: "/read",
        route: reading_route_1.ReadRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
