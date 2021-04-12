import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/types";
import { UserRepository } from "../user/user.repository";

@injectable()
export class AuthService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}
}
