import { injectable } from "inversify";
import { ConnectionOptions, createConnection, DatabaseType } from "typeorm";
import { pgHost, pgUser, pgPass, pgDb } from "../";
import Logger from "../../common/logger/winston.logger";

@injectable()
export class TypeOrmConfig {
  private logger = Logger;

  public async connection(): Promise<any> {
    try {
      await createConnection(config);
      this.logger.info("[TypeORM] Database connected 💾");
    } catch (err) {
      this.logger.error(`[TypeORM] Failed to connect: ${err.message} ❌`);
      process.exit(1);
    }

    return config;
  }
}

export const config: ConnectionOptions = <ConnectionOptions>{
  type: <DatabaseType>"postgres",
  host: pgHost,
  username: pgUser,
  password: pgPass,
  database: pgDb,
  synchronize: false,
  entities: ["src/modules/**/entity/*.entity.ts", "dist/src/modules/**/entity/*.entity.js"],
  seeds: ["dist/src/config/database/seed/*.seed.js"],
  factories: ["dist/src/config/database/factory/*.factory.js"],
  migrations: ["dist/src/migration/*.js"],
  cli: {
    migrationsDir: "src/migration",
  },
};
