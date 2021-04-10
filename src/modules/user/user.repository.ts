import { injectable } from "inversify";
import { getConnection } from "typeorm";
import { User } from "./entity/user.entity";

@injectable()
export class UserRepository {
  private connection;

  constructor() {
    this.connection = getConnection();
  }

  // fetch users
  public async fetchUsers(): Promise<User[]> {
    return await this.connection.createQueryBuilder(User, "user").getMany();
  }
}
