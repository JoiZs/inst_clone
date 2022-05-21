import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./ment";
import { Post } from "./post";

@ObjectType()
@Entity()
export class Insu {
  @PrimaryGeneratedColumn("uuid")
  userid!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  username!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  fullname!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "int", default: 0 })
  tokenVersion!: number;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.postUser)
  posts!: Post[];

  @OneToMany(() => Comment, (ment) => ment.mentUser)
  comments!: Comment[];
}
