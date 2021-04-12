import { inject } from "inversify";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { TYPES } from "../../ioc/types";
import { UserService } from "./user.service";
import { Request, Response, NextFunction } from "express";
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";

@ApiPath({
  path: "/user",
  name: "User",
})
@controller("/api/v1/user")
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @ApiOperationGet({
    description: "Fetch users from database",
    path: "",
    responses: {
      200: { description: "Success" },
      404: { description: "No registered users" },
      500: { description: "Internal server error" },
    },
  })
  @httpGet("/")
  public async fetchUsers(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.userService.fetchUsers();
      if (results.length == 0) {
        return this.json({ detail: "No registered users" }, 404);
      }
      return this.json(results, 200);
    } catch (err) {
      return this.json(err, 500);
    }
  }

  @ApiOperationGet({
    description: "Get user by Id",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          required: true,
          type: SwaggerDefinitionConstant.Parameter.Type.NUMBER,
        },
      },
    },
    responses: {
      200: { description: "Success" },
      404: { description: "No user found by this Id" },
      500: { description: "Internal server error" },
    },
  })
  @httpGet("/:id")
  public async getById(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.userService.getById(+req.params.id);

      if (!results) {
        return this.json({ detail: `No user found by Id ${+req.params.id}` }, 404);
      }
      return this.json(results, 200);
    } catch (err) {
      return this.json(err, 500);
    }
  }
}
