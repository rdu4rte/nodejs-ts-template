import express, { Application } from "express";
import * as swagger from "swagger-express-ts";
import Logger from "../../common/logger/winston.logger";
import { port } from "../env/env.config";

export class SwaggerLoader {
  public static Load(app: Application) {
    const logger = Logger;

    app.use("/api-docs/swagger", express.static("swagger"));
    app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
    app.use(
      swagger.express({
        definition: {
          info: {
            title: "NodeJS API - Template",
            version: "1.0",
          },
          basePath: "/api/v1",
          securityDefinitions: {
            apiKeyHeader: {
              type: swagger.SwaggerDefinitionConstant.Security.Type.API_KEY,
              in: swagger.SwaggerDefinitionConstant.Security.In.HEADER,
              name: "Authorization",
            },
          },
        },
      }),
    );

    logger.info(`[Swagger] Docs running on: http://127.0.0.1:${port}/api-docs/swagger 📑`);

    return app;
  }
}
