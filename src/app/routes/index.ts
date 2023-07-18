import express from "express";
import { BookRoutes } from "../modules/Books/books.route";
import { userRoutes } from "../modules/User/user.route";
import { WishRoutes } from "../modules/wishlist/wishlist.route";
import { ReadRoutes } from "../modules/reading/reading.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/wish",
    route: WishRoutes,
  },
  {
    path: "/read",
    route: ReadRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
