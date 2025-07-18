import express from "express";
import { handleApiResponse } from "../utils/handle-api-response";
import { itemsController } from "../controllers/item-controller";
import { itemPriceController } from "../controllers/item-price-controller";
import { validateRequest } from "../middlewares/validate-request-middleware";
import {
  createItemPriceBodySchema,
  itemPriceIdParamsSchema,
} from "../validators/schemas/item-price-schema";

const router = express.Router();

router.get("/", handleApiResponse(itemsController.getItemsWithPrice));
router.get(
  "/:id",
  validateRequest({ params: itemPriceIdParamsSchema }),
  handleApiResponse(itemPriceController.getPrice)
);

router.post(
  "/",
  validateRequest({ body: createItemPriceBodySchema }),
  handleApiResponse(itemPriceController.createPrice)
);

export default router;
