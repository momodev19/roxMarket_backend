import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { OpenAPIV3 } from "openapi-types";

const swaggerOptions: {
  definition: OpenAPIV3.Document;
  apis: string[];
} = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ragnarok X Global Market API",
      version: "1.0.0",
      description: "Personal project for Ragnarok X Global Market",
    },
    paths: {},
  },
  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: "My API Docs",
    })
  );

  // Serve the raw swagger.json spec
  app.get("/swagger.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
