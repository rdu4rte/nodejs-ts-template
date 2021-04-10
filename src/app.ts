import "reflect-metadata";
import { port, nodeEnv } from "./config";
import { InversifyExpressServer } from "inversify-express-utils";
import { ContainerConfig } from "./ioc/container";
import Logger from "./common/logger/winston.logger";
import { TypeOrmConfig } from "./config";
import { TYPES } from "./ioc/types";
import { ServerLoader } from "./config/loaders/server.loader";
import { SwaggerLoader } from "./config/loaders/swagger.loader";

const serverStart = async () => {
  const logger = Logger;

  try {
    const container = ContainerConfig.Load();
    const server = new InversifyExpressServer(container);

    const typeorm = container.get<TypeOrmConfig>(TYPES.TypeOrmConfig);
    await typeorm.connection();

    server.setConfig((app) => {
      ServerLoader.Load(app);

      if (nodeEnv === "development") {
        SwaggerLoader.Load(app);
      }
    });

    const serverInstance = server.build();
    serverInstance.listen(port, () => {
      logger.info(`[Bootstrap] Server running on: http://127.0.0.1:${port}/api/v1/ 🚀`);
    });
  } catch (err) {
    logger.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
};

serverStart();
