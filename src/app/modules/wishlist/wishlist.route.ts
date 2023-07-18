import express from "express";
import { WishController } from "./wishlist.controller";

const router = express.Router();

router.post("/", WishController.createWishController);

router.get("/", WishController.getAllWishController);

export const WishRoutes = router;
