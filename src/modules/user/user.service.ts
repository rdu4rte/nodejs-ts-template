import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/types";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  // fetch users
  public async fetchUsers(): Promise<User[]> {
    return this.userRepository.fetchUsers();
  }

  // get by id
  public async getById(id: number): Promise<User> {
    return this.userRepository.getById(id);
  }
}
