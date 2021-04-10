import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export enum Role {
  admin = "admin",
  user = "user",
}

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password_confirm: string;
}
