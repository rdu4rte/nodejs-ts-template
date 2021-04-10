import { Container } from "inversify";
import { TypeOrmConfig } from "../config";
import { TYPES } from "./types";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { UserController } from "../modules/user/user.controller";

export class ContainerConfig {
  public static Load(): Container {
    const container = new Container();

    // common services
    container.bind<TypeOrmConfig>(TYPES.TypeOrmConfig).to(TypeOrmConfig);

    // repositories
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

    // services
    container.bind<UserService>(TYPES.UserService).to(UserService);

    // controllers
    container.bind<UserController>(TYPES.UserController).to(UserController);

    return container;
  }
}
