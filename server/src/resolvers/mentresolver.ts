import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Comment } from "../entities";
import { isAuth } from "../middlewares/isauth";
import MentRepo from "../repo/mentrepo";
import { myCtx } from "../types";
import { Resp } from "./resp";

@InputType()
class mentInpType {
  @Field(() => String)
  mentText!: string;

  @Field(() => String)
  mentPostID!: string;

  @Field(() => String, { nullable: true })
  mentReplyID?: string;
}

@Resolver()
export class MentResolver {
  @Query(() => [Comment])
  @UseMiddleware(isAuth)
  async ments() {
    return await MentRepo.find({
      order: { mentCreatedAt: "DESC" },
      take: 10,
      relations: { mentUser: true },
    });
  }

  @Mutation(() => Resp)
  @UseMiddleware(isAuth)
  async postment(
    @Arg("mentinp") mentinp: mentInpType,
    @Ctx() { payload }: myCtx
  ): Promise<Resp> {
    const user = payload;
    const ment = await MentRepo.save({
      mentText: mentinp.mentText,
      mentPostID: mentinp.mentPostID,
      mentUserID: user.id,
      mentReplied: mentinp.mentReplyID,
    });
    return {
      data: {
        type: "Comment",
        message: `Successfully mented ${ment.mentPostID}`,
      },
    };
  }

  @Mutation(() => Resp)
  @UseMiddleware(isAuth)
  async delment(@Arg("mentId") mentId: string, @Ctx() { payload }: myCtx) {
    const { id: userid } = payload;

    const ment = await MentRepo.findOne({ where: { mentId: mentId } });
    if (ment?.mentUserID !== userid)
      return {
        error: {
          type: "Comment",
          message: "It's not your ment",
        },
      };

    const mentdelete = await MentRepo.delete({ mentId: mentId });
    return {
      data: {
        type: "Comment",
        message: `Successfully deleted ${mentdelete}`,
      },
    };
  }
}
