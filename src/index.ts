import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Importing routes
import itemsRoute from "./routes/item-route";
import { setupSwagger } from "./swagger";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

setupSwagger(app);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript + Docker!");
});

app.use("/items", itemsRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
