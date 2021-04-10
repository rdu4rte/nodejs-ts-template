import { User } from "./../../../modules/user/entity/user.entity";
import { define } from "typeorm-seeding";
import * as fs from "fs";

export const userData = JSON.parse(fs.readFileSync("dataseed/user-seed.json", "utf-8"));

define(User, () => {
  const users = userData.map((user: User) => {
    const newUser = new User();

    newUser.username = user.username;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.password = user.password;
  });
  return users;
});
