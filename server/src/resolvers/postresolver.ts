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
import PostRepo from "../repo/postrepo";
import { Post } from "../entities/post";
import { myCtx } from "../types";
import { isAuth } from "../middlewares/isauth";
import { Resp } from "./resp";
import { uploadImg } from "../utils/uploadcdy";

@InputType()
class postContentInp {
  @Field(() => String)
  url!: string;
}

@InputType()
class postCreateInp {
  @Field(() => String, { nullable: true })
  postText?: string;

  @Field(() => [postContentInp], { nullable: true })
  postContent?: postContentInp[];
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  @UseMiddleware(isAuth)
  async posts() {
    const posts = await PostRepo.find({
      relations: { postUser: true },
      order: { postCreatedAt: { direction: "DESC" } },
    });
    return posts;
  }

  @Query(() => Post)
  @UseMiddleware(isAuth)
  async singlepost(@Arg("postid") postid: string) {
    const post = await PostRepo.findOne({
      where: { postID: postid },
      relations: { postUser: true },
    });
    return post;
  }

  @Mutation(() => Resp)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("postcreateinp") postcreateinp: postCreateInp,
    @Ctx() { payload }: myCtx
  ): Promise<Resp> {
    const user = payload;
    const imgCount = postcreateinp.postContent!.length;
    let dbImg = [];

    for (let x = 0; x < imgCount; x++) {
      const imgres = await uploadImg(postcreateinp.postContent![x].url);
      dbImg.push({ url: imgres.url });
    }

    const createPost = await PostRepo.save({
      postUserID: user.id,
      postContent: dbImg,
      postText: postcreateinp.postText,
    });

    return {
      data: {
        type: "Create Post",
        message: `Successfully created a post ${createPost.postID}`,
      },
    };
  }

  @Mutation(() => Resp)
  @UseMiddleware(isAuth)
  async delpost(
    @Arg("postid") postid: string,
    @Ctx() { payload }: myCtx
  ): Promise<Resp> {
    const { id: userid } = payload;

    const post = await PostRepo.findOne({ where: { postID: postid } });
    if (post?.postUserID !== userid)
      return {
        error: {
          type: "Post",
          message: "It's not your post to delete",
        },
      };

    const postdelete = await PostRepo.delete({ postID: postid });
    return {
      data: {
        type: "Post",
        message: `Successfully deleted ${postdelete}`,
      },
    };
  }
}
