import { User } from "./../../../modules/user/entity/user.entity";
import { define } from "typeorm-seeding";
import Faker from "faker";

define(User, (faker: typeof Faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = `${firstName}_${lastName}${Math.floor(Math.random() * 100)}`.toLowerCase();
  const email = faker.internet.email();
  const password = "123123";

  const newUser = new User();
  newUser.username = username;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email.toLowerCase();
  newUser.password = password;

  return newUser;
});
