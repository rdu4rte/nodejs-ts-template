import { Application, json, urlencoded, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import Logger from "../../common/logger/winston.logger";
import { nodeEnv } from "../env/env.config";

export class ServerLoader {
  public static Load(app: Application) {
    app.use(cors());

    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );

    app.use(compression());

    app.use(
      rateLimit({
        windowMs: 5 * 60 * 1000, // 5min
        max: 100,
        message: "Too many requests, try again later.",
      }),
    );

    Logger.info("[Server] Server loaded 📁");

    const ifSwaggerActive =
      nodeEnv === "development" || nodeEnv === "test"
        ? "http://127.0.0.1:3003/api-docs/swagger"
        : "Swagger documentation is disabled in production";

    app.get("/api/v1", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        message: "NodeJS & TypeScript API Template",
        docs: ifSwaggerActive,
      });
    });

    return app;
  }
}
