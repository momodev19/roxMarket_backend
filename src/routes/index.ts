import express from "express";
import itemsRouter from "./item-route";
import itemPricesRouter from "./item-price-route";

const router = express.Router();

router.use("/items/prices", itemPricesRouter);
router.use("/items", itemsRouter);

export default router;
