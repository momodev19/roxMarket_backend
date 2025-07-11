declare module "swagger-jsdoc" {
  import { OpenAPIV3 } from "openapi-types";

  export interface SwaggerJSDocOptions {
    definition: OpenAPIV3.Document;
    apis: string[];
  }

  export default function swaggerJsdoc(
    options: SwaggerJSDocOptions
  ): OpenAPIV3.Document;
}
