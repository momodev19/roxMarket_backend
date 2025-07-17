import express from "express";
import itemsRouter from "./item-route";
import itemPricesRouter from "./item-price-route";

const router = express.Router();

router.use("/items", itemsRouter);
router.use("/items/prices", itemPricesRouter);

export default router;
