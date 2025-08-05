import express from "express";
import itemsRouter from "./item-route";
import itemPricesRouter from "./item-price-route";
import itemTypeRouter from "./item-type-route";

const router = express.Router();

router.use("/items/types", itemTypeRouter);
router.use("/items/prices", itemPricesRouter);
router.use("/items", itemsRouter);

export default router;
