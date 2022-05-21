import { Grid } from "@mui/material";
import { ReactComponent as Save } from "../assets/icons/saved.svg";
import { ReactComponent as Like } from "../assets/icons/activity.svg";
import { ReactComponent as Ment } from "../assets/icons/ment.svg";
import { ReactComponent as Send } from "../assets/icons/direct.svg";
import ReadMore from "read-more-less-react";
import { Link } from "react-router-dom";
import { timerelative } from "../utils/timerelative";

interface Props {
  postid?: string;
  isPage?: boolean;
  liked?: number;
  cont?: string | null;
  time?: any;
  user?:
    | {
        __typename?: "Insu" | undefined;
        username: string;
      }
    | undefined;
}

const Engagement = ({
  isPage = false,
  liked,
  cont,
  time,
  user,
  postid,
}: Props) => {
  return (
    <Grid item>
      <Grid item className="w-full flex justify-between px-4 py-2">
        <div className="flex flex-row items-center">
          <Like className=" dark:text-gray-300 dark:fill-gray-300 hover:opacity-50 cursor-pointer" />
          <Link to={`p/${postid}`}>
            <Ment className="ml-2 dark:text-gray-300 dark:fill-gray-300 hover:opacity-50 cursor-pointer" />
          </Link>
          <Send className="ml-2 dark:text-gray-300 dark:fill-gray-300 opacity-50 cursor-pointer" />
        </div>
        <div className="flex flex-1 justify-end items-center">
          <Save className="w-6 h-6 dark:text-gray-300 dark:fill-gray-300 opacity-50 cursor-pointer" />
        </div>
      </Grid>
      <Grid item className="px-4 text-sm">
        <Grid item>{liked} Liked</Grid>
        <Grid
          item
          display={{
            xs: `${isPage ? "flex" : ""}`,
            md: `${isPage ? "none" : ""}`,
          }}
        >
          <span>
            <span className="font-semibold">{user?.username}</span>
            <ReadMore
              text={cont!}
              readLessText={"less"}
              readMoreText={"more"}
              lines={1}
            />
          </span>
        </Grid>
        <Grid
          display={{
            xs: `${isPage ? "flex" : ""}`,
            md: `${isPage ? "none" : ""}`,
          }}
          className="text-gray-400 cursor-pointer"
          item
        >
          <Link to={`p/${postid}`}>View all comments</Link>
        </Grid>
        <Grid className="text-gray-400 text-xs pb-4" item>
          {timerelative(time)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Engagement;
