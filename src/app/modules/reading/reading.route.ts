import express from "express";
import { WishController } from "./wishlist.controller";
import { ReadController } from "./reading.controller";

const router = express.Router();

router.post("/", ReadController.createReadController);

router.get("/", ReadController.getAllReadController);

export const ReadRoutes = router;
