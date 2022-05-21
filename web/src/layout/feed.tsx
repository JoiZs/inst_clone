import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { Grid } from "@mui/material";
import Userbox from "../components/userbox";
import Suggbox from "../components/suggbox";
import ThemeMode from "../components/thememode";
import Post from "./post";
import { useEffect, useState } from "react";

interface Props {}

const Feed = (props: Props) => {
  const [isPost, setIsPost] = useState(false);
  const [{ data }] = usePostsQuery();
  const [me] = useMeQuery();

  useEffect(() => {
    if (data?.posts && me.data?.me) setIsPost(true);
  }, [data?.posts, me.data?.me]);

  return (
    <Grid
      container
      spacing={2}
      paddingLeft={{ xs: "16px", md: "0px" }}
      className="flex-1 py-4 max-w-full"
    >
      <Grid item xs={12} md={8}>
        {isPost &&
          data?.posts.map((post) => <Post key={post.postID} post={post} />)}
      </Grid>
      <Grid
        item
        xs={0}
        md={4}
        display={{ xs: "none", md: "flex" }}
        className=" flex justify-center"
      >
        <div className="flex flex-col w-[300px] flex-1 text-xs tracking-[0.015rem] fixed">
          <div>{isPost && <Userbox username={me.data!.me.username} />}</div>
          <div>
            <Suggbox />
          </div>
          <div>
            <ThemeMode />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Feed;
