import { inject } from "inversify";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { TYPES } from "../../ioc/types";
import { UserService } from "./user.service";
import { Request, Response, NextFunction } from "express";

@controller("/api/v1/user")
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @httpGet("/")
  public async fetchUsers(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.userService.fetchUsers();
      return this.json(results, 200);
    } catch (err) {
      return this.json({
        message: `Internal Server Error: ${err}`,
        statusCode: 500,
      });
    }
  }
}
