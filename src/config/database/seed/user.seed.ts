import { Factory, Seeder } from "typeorm-seeding";
import { User } from "../../../modules/user/entity/user.entity";

export default class SeedUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(10);
  }
}
