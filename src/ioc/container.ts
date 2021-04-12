import { Container } from "inversify";
import { TypeOrmConfig } from "../config";
import { TYPES } from "./types";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { UserController } from "../modules/user/user.controller";
import { AuthService } from "../modules/auth/auth.service";

export class ContainerConfig {
  public static Load(): Container {
    const container = new Container();

    // common services
    container.bind<TypeOrmConfig>(TYPES.TypeOrmConfig).to(TypeOrmConfig);

    // repositories
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

    // services
    container.bind<UserService>(TYPES.UserService).to(UserService);
    container.bind<AuthService>(TYPES.AuthService).to(AuthService);

    // controllers
    container.bind<UserController>(TYPES.UserController).to(UserController);

    return container;
  }
}
