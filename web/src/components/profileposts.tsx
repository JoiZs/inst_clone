/* eslint-disable no-restricted-globals */
import { Box, ImageList } from "@mui/material";
import { Link } from "react-router-dom";
import Eachimgexp from "./eachimgexp";

interface Props {
  posts?:
    | {
        __typename?: "Post" | undefined;
        postID: string;
        postLiked: number;
        postContent?:
          | {
              __typename?: "Content" | undefined;
              url: string;
            }[]
          | null
          | undefined;
      }[]
    | null
    | undefined;
}

const Profileposts = ({ posts }: Props) => {
  return (
    <Box>
      <ImageList
        variant="quilted"
        gap={1}
        cols={3}
        rowHeight={innerWidth >= 767 ? 309 : (innerWidth - 3) / 3}
      >
        {!posts || posts.length === 0 ? (
          <div className="w-full h-52 col-span-3 flex justify-center items-center">
            No Posts
          </div>
        ) : (
          posts.map((el) => (
            <Link
              className="flex justify-center items-center"
              to={`/p/${el.postID}`}
              key={el.postID}
            >
              <Eachimgexp img={el.postContent![0].url} type="small" />
            </Link>
          ))
        )}
      </ImageList>
    </Box>
  );
};

export default Profileposts;
