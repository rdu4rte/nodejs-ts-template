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

  // get by id
  public async getById(id: number): Promise<User> {
    return await this.repository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: id })
      .andWhere("user.active = :active", { active: true })
      .getOne();
  }
}
