import { config } from "./src/config";
import { nodeEnv } from "./src/config/env/env.config";
import { configProd } from "./src/config/database/typeorm.config";

switch (nodeEnv) {
  case "development":
    module.exports = config;
    break;
  case "production":
    module.exports = configProd;
    break;
  default:
    module.exports = config;
}
