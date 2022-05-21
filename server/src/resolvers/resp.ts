import { ObjectType, Field } from "type-graphql";

@ObjectType()
class ResType {
  @Field(() => String)
  type!: string;

  @Field(() => String)
  message!: string;
}

@ObjectType()
export class Resp {
  @Field(() => ResType, { nullable: true })
  data?: ResType;

  @Field(() => ResType, { nullable: true })
  error?: ResType;
}
