import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Insu } from "./insu";
import { Post } from "./post";

@ObjectType()
@Entity()
export class Comment {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  mentId!: string;

  @Field(() => String)
  @Column()
  mentUserID!: string;

  @Field(() => Insu)
  @ManyToOne(() => Insu, (insu) => insu.comments)
  @JoinColumn({ name: "mentUserID" })
  mentUser!: Insu;

  @Field(() => String)
  @Column({ type: "text" })
  mentText!: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  mentCreatedAt?: Date;

  @Field(() => Int)
  @Column({ type: "bigint", default: 0 })
  mentLiked: number = 0;

  @Field(() => String, { nullable: true })
  @Column({ type: "uuid", nullable: true })
  mentReplied?: string;

  @Field(() => String)
  @Column("uuid")
  mentPostID!: string;

  @ManyToOne(() => Post, (post) => post.postComment)
  @JoinColumn({ name: "mentPostID" })
  mentPost!: Post;
}
