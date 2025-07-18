import express from "express";
import { handleApiResponse } from "../utils/handle-api-response";
import { itemsController } from "../controllers/item-controller";
import { itemPriceController } from "../controllers/item-price-controller";
import { validateRequest } from "../middlewares/validate-request-middleware";
import {
  createItemPriceBodySchema,
  itemPriceIdParamSchema,
  updateItemPriceBodySchema,
} from "../validators/schemas/item-price-schema";

const router = express.Router();

/**
 * @swagger
 * /items/prices/:
 *   get:
 *     summary: Retrieve all item with the latest price
 *     tags: [Item Prices]
 *     responses:
 *       200:
 *         description: List of items with latest price
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Sword"
 *                   itemId:
 *                     type: integer
 *                     example: 1
 *                   price:
 *                     type: integer
 *                     example: 100
 */
router.get("/", handleApiResponse(itemsController.getItemsWithPrice));

/**
 * @swagger
 * /items/prices/{id}:
 *   get:
 *     summary: Retrieve an item price by ID
 *     tags: [Item Prices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item price to retrieve
 *     responses:
 *       200:
 *         description: Item price details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 itemId:
 *                   type: integer
 *                   example: 1
 *                 price:
 *                   type: integer
 *                   example: 100
 *                 date:
 *                   type: string
 *                   example: "2023-01-01T00:00:00.000Z"
 */
router.get(
  "/:id",
  validateRequest({ params: itemPriceIdParamSchema }),
  handleApiResponse(itemPriceController.getPrice)
);

/**
 * @swagger
 * /items/prices:
 *   post:
 *     summary: Create a new item price
 *     tags: [Item Prices]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 example: 1
 *               price:
 *                 type: integer
 *                 example: 100
 *               date:
 *                 type: string
 *                 example: "2023-01-01"
 *     responses:
 *       201:
 *         description: Item price created successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             itemId:
 *               type: integer
 *               example: 1
 *             price:
 *               type: integer
 *               example: 100
 *             date:
 *               type: string
 *               example: "2023-01-01T00:00:00.000Z"
 */
router.post(
  "/",
  validateRequest({ body: createItemPriceBodySchema }),
  handleApiResponse(itemPriceController.createPrice)
);

/**
 * @swagger
 * /items/prices/{id}:
 *   put:
 *     summary: Update an existing item price
 *     tags: [Item Prices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item price to retrieve
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 example: 1
 *               price:
 *                 type: integer
 *                 example: 100
 *               date:
 *                 type: string
 *                 example: "2023-01-01"
 *     responses:
 *       200:
 *         description: Item price created successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             itemId:
 *               type: integer
 *               example: 1
 *             price:
 *               type: integer
 *               example: 100
 *             date:
 *               type: string
 *               example: "2023-01-01T00:00:00.000Z"
 */
router.put(
  "/:id",
  validateRequest({
    params: itemPriceIdParamSchema,
    body: updateItemPriceBodySchema,
  }),
  handleApiResponse(itemPriceController.updatePrice)
);

/**
 * @swagger
 * /items/prices/{id}:
 *   delete:
 *     summary: Delete an item price by ID
 *     tags: [Item Prices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item price to delete
 *     responses:
 *       204:
 *         description: Item price deleted successfully
 */
router.delete(
  "/:id",
  validateRequest({ params: itemPriceIdParamSchema }),
  handleApiResponse(itemPriceController.deletePrice)
);

export default router;
