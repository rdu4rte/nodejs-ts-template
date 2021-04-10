import * as dotenv from "dotenv";

export const nodeEnv: string = process.env.NODE_ENV;

switch (nodeEnv) {
  case "development":
    dotenv.config({ path: ".env.local" });
    break;
  case "production":
    dotenv.config({ path: ".env" });
    break;
  default:
    dotenv.config({ path: ".env.local" });
}

// custom ports
export const port: number = +process.env.PORT || +process.env.CUSTOM_PORT;

// db
export const pgHost: string = process.env.POSTGRES_HOST;
export const pgPort: number = +process.env.POSTGRES_PORT;
export const pgUser: string = process.env.POSTGRES_USERNAME;
export const pgPass: string = process.env.POSTGRES_PASSWORD;
export const pgDb: string = process.env.POSTGRES_DATABASE;

// jwt
export const jwtSecret: string = process.env.JWT_SECRET;
export const jwtExpires: number = +process.env.JWT_EXPIRESIN;
export const jwtSecretRef: string = process.env.JWT_REFRESH;
export const jwtExpiresRef: number = +process.env.JWT_REFRESH_EXPIRESIN;

// argon salt
export const saltPass: number = +process.env.SALT;
