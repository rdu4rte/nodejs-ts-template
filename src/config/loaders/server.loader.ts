import { Application, json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import Logger from "../../common/logger/winston.logger";

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
    return app;
  }
}
