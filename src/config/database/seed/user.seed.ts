import { Factory, Seeder } from "typeorm-seeding";
import { User } from "../../../modules/user/entity/user.entity";
import { userData } from "../factory/user.factory";

export default class SeedUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(userData.length);
  }
}
