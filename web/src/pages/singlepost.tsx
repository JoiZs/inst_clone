/* eslint-disable no-restricted-globals */
import { Box, Grid } from "@mui/material";
import Engagement from "../components/engagement";
import Mentinp from "../components/mentinp";
import Userbox from "../components/userbox";
import { Link, useParams } from "react-router-dom";
import { useCommentsQuery, useSinglepostQuery } from "../generated/graphql";
import Notfound from "./notfound";
import Postimg from "../components/postimg";
import Loading from "../components/loading";
import { BigHead } from "@bigheads/core";
import { timerelative } from "../utils/timerelative";

interface Props {}

const Singlepost = (props: Props) => {
  const { id } = useParams();
  const [{ data: mentdata, fetching: mentfetching }] = useCommentsQuery();
  const [{ data, fetching }] = useSinglepostQuery({
    variables: {
      postid: id!,
    },
  });

  if (fetching && mentfetching) return <Loading />;

  if (data?.singlepost && mentdata?.ments) {
    return (
      <Grid
        container
        className="bg-white dark:bg-gray-500 flex-1 border border-gray-300 dark:border-gray-600 md:my-8"
      >
        <Grid item xs={12} md={7} className="overflow-hidden">
          <Box display={{ xs: "flex", md: "none" }}>
            <Userbox username={data.singlepost.postUser.username} type="post" />
          </Box>
          <Box className="relative h-full">
            <Postimg isCover={true} source={data.singlepost.postContent} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box className="flex h-full flex-col justify-between">
            <Box
              className="border-b border-gray-300 dark:border-gray-600 shadow"
              display={{ xs: "none", md: "flex" }}
            >
              <Userbox
                username={data.singlepost.postUser.username}
                type="post"
              />
            </Box>
            <Box
              flexDirection={"column"}
              className=" border-b border-gray-300 dark:border-gray-600"
              display={{ xs: "none", md: "flex" }}
            >
              <div className="h-96 overflow-y-scroll hiddenscroll">
                {mentdata.ments.map((ment) => (
                  <div
                    key={ment.mentId}
                    className="w-full flex flex-col py-2 text-sm"
                  >
                    <div className="font-semibold flex flex-row items-center">
                      <div className="w-12 h-12">
                        <BigHead />
                      </div>
                      <Link className="px-2" to={ment.mentUser.username}>
                        {ment.mentUser.username}
                      </Link>
                      <span className="font-normal">{ment.mentText}</span>
                    </div>
                    <div className="pl-14 text-xs space-x-4">
                      <span>{timerelative(ment.mentCreatedAt)}</span>
                      <span>{ment.mentReplied} Replied</span>
                      <span>Reply</span>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
            <Box className="flex-1 flex flex-col justify-between">
              <Engagement
                liked={data.singlepost.postLiked}
                time={data.singlepost.postCreatedAt}
                isPage={true}
              />
              <Box display={{ xs: "none", md: "flex" }}>
                <Mentinp postID={data.singlepost.postID} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return <Notfound />;
};

export default Singlepost;
