import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

export enum Role {
  admin = "admin",
  user = "user",
}

@ApiModel({
  name: "UserDTO",
})
export class UserDTO {
  @ApiModelProperty({
    description: "Username",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiModelProperty({
    description: "First name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiModelProperty({
    description: "Last name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiModelProperty({
    description: "Email",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiModelProperty({
    description: "Password",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiModelProperty({
    description: "Confirm password",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password_confirm: string;
}
