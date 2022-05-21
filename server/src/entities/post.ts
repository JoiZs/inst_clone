import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Insu } from "./insu";
import { Comment } from "./ment";

@ObjectType()
@Entity()
class Content {
  @Field(() => String)
  @Column({ type: "text" })
  url?: string;
}

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  postID!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  postText?: string;

  @Field(() => Int)
  @Column({ type: "bigint", default: 0 })
  postLiked: number = 0;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (ment) => ment.mentId)
  postComment?: Comment[];

  @Field(() => [Content], { nullable: true })
  @Column({ type: "jsonb" })
  postContent!: Content[];

  @Field(() => String)
  @Column("uuid")
  postUserID!: string;

  @Field(() => Insu)
  @ManyToOne(() => Insu, (insu) => insu.posts)
  @JoinColumn({ name: "postUserID" })
  postUser!: Insu;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  postCreatedAt!: Date;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  postUpdatedAt!: Date;
}
