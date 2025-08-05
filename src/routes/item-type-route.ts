import express from "express";
import { handleApiResponse } from "../utils/handle-api-response";
import { validateRequest } from "../middlewares/validate-request-middleware";
import { itemTypeController } from "../controllers/item-type-controller";

const router = express.Router();

/**
 * @swagger
 * /items/types:
 *   get:
 *     summary: Retrieve all item types
 *     tags: [Item Types]
 *     responses:
 *       200:
 *         description: List of item types
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
 *                     example: "Weapon"
 */
router.get("/", handleApiResponse(itemTypeController.getItemTypes));

export default router;
