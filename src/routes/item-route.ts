import express from "express";
import { itemsController } from "../controllers/item-controller";

const router = express.Router();

router.get("/", itemsController.getItems);
router.get("/:id", itemsController.getItemById);

export default router;
