import express from "express";
import { ReadController } from "./reading.controller";

const router = express.Router();

router.post("/", ReadController.createReadController);

router.get("/", ReadController.getAllReadController);

router.get("/:id", ReadController.updateReadController);

export const ReadRoutes = router;
