import { Grid } from "@mui/material";
import Userbox from "../components/userbox";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "read-more-less-react/dist/index.css";
import "../style/sliderarrow.css";
import Engagement from "../components/engagement";
import Mentinp from "../components/mentinp";
import Postimg from "../components/postimg";
import { Link } from "react-router-dom";

interface Props {
  post?: {
    __typename?: "Post" | undefined;
    postID: string;
    postText?: string | null | undefined;
    postLiked: number;
    postUserID: string;
    postCreatedAt: any;
    postUser: {
      __typename?: "Insu" | undefined;
      username: string;
    };
    postContent?:
      | {
          __typename?: "Content" | undefined;
          url: string;
        }[]
      | null
      | undefined;
  };
}

const Post = ({ post }: Props) => {
  return (
    <Grid
      container
      direction={"column"}
      className="bg-white border mb-4 rounded-sm border-gray-300 dark:border-gray-500 dark:bg-gray-600"
    >
      <Grid item>
        <Link to={post!.postUser.username}>
          <Userbox username={post!.postUser.username} type="post" />
        </Link>
      </Grid>
      <Grid item>
        <Postimg source={post?.postContent} />
      </Grid>
      <Engagement
        time={post?.postCreatedAt}
        cont={post?.postText}
        liked={post?.postLiked}
        user={post?.postUser}
        postid={post?.postID}
      />
      <Grid
        className="w-full border-t border-gray-300 dark:border-gray-400"
        item
      >
        <Mentinp postID={post!.postID} />
      </Grid>
    </Grid>
  );
};

export default Post;
