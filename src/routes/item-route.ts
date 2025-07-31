import express from "express";
import { validateRequest } from "../middlewares/validate-request-middleware";
import {
  itemIdParamSchema,
  itemBodySchema,
  optionalItemBodySchema,
} from "../validators/schemas/item-schema";
import { itemsController } from "../controllers/item-controller";
import { handleApiResponse } from "../utils/handle-api-response";

const router = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieve all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items
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
 */
router.get("/", handleApiResponse(itemsController.getItems));

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retrieve an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to retrieve
 *     responses:
 *       200:
 *         description: Item details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Sword"
 */
router.get(
  "/:id",
  validateRequest({ params: itemIdParamSchema }),
  handleApiResponse(itemsController.getItemById)
);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Sword"
 *               type:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Item created successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "New Sword"
 *             type:
 *               type: integer
 *               example: 1
 */
router.post(
  "/",
  validateRequest({ body: itemBodySchema }),
  handleApiResponse(itemsController.createItem)
);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Sword"
 *               type:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Updated Sword"
 *               type:
 *                 type: integer
 *                 example: 1
 */
router.put(
  "/:id",
  validateRequest({ params: itemIdParamSchema, body: optionalItemBodySchema }),
  handleApiResponse(itemsController.updateItem)
);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */
router.delete(
  "/:id",
  validateRequest({ params: itemIdParamSchema }),
  handleApiResponse(itemsController.removeItem)
);

/**
 * @swagger
 * /items/{id}/prices:
 *   get:
 *     summary: Retrieve all prices for an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to retrieve prices for
 *     responses:
 *       200:
 *         description: List of item prices
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: "Sword"
 *                  itemId:
 *                    type: integer
 *                    example: 1
 *                  ItemPrice:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        price:
 *                          type: number
 *                          example: 10
 *                        date:
 *                          type: string
 *                          example: "2023-05-01T00:00:00.000Z"
 */
router.get(
  "/:id/prices/",
  validateRequest({ params: itemIdParamSchema }),
  handleApiResponse(itemsController.getItemWithAllPrices)
);

export default router;
