import express from "express";
import { handleApiResponse } from "../utils/handle-api-response";
import { itemsController } from "../controllers/item-controller";

const router = express.Router();
/**
 * @swagger
 * /items/prices/all:
 *   get:
 *     summary: Retrieve all items with their latest prices
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items with latest prices
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
 *                   typeId:
 *                     type: integer
 *                     example: 1
 *                   price:
 *                     type: integer
 *                     example: 100
 */
router.get("/all", handleApiResponse(itemsController.getItemsWithPrice));

export default router;
