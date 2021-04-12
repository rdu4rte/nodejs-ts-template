import request from "supertest";
import { ServerLoader } from "../src/config/loaders/server.loader";

const appStart = ServerLoader.Load;

describe("check server start", () => {
  test("should start server and enable root endpoint: /api/v1", async () => {
    request(appStart).get("/api/v1").expect(200).expect({
      message: "NodeJS & TypeScript API Template",
      docs: "http://127.0.0.1:3003/api-docs/swagger",
    });
  });
});
