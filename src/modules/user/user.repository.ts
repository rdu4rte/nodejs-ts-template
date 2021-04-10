import { injectable } from "inversify";
import { getConnection } from "typeorm";
import { User } from "./entity/user.entity";

@injectable()
export class UserRepository {
  private repository;

  constructor() {
    this.repository = getConnection().getRepository<User>(User);
  }

  // fetch users
  public async fetchUsers(): Promise<User[]> {
    return await this.repository.createQueryBuilder().getMany();
  }
}
