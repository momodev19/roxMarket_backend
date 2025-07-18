import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Importing routes
import apiRouter from "./routes/index";
import { setupSwagger } from "./swagger";
import { globalErrorResponseMiddleware } from "./middlewares/globals/global-error-response-middleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

setupSwagger(app);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript + Docker!");
});

app.use("/api/v1", apiRouter);

// response middlewares
app.use(globalErrorResponseMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

setInterval(() => {
  const used = process.memoryUsage();
  console.log(
    `[MEMORY] RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB, Heap: ${(
      used.heapUsed /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
}, 10000); // every 10s
