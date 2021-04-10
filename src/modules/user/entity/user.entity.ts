import { randomBytes } from "crypto";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../dto/user.dto";
import { saltPass } from "../../../config";
import * as argon2 from "argon2";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column("enum", {
    nullable: false,
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @Column({ nullable: false, default: true })
  active: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = randomBytes(saltPass);
    this.password = await argon2.hash(this.password, { salt });
  }
}
