import { ImageListItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

interface Props {
  type: "small" | "large";
  img?: string;
}

const Eachimgexp = ({ type, img }: Props) => {
  return (
    <ImageListItem
      className="group relative w-full"
      cols={type === "small" ? 1 : 2}
      rows={type === "small" ? 1 : 2}
    >
      <img
        className=" group-hover:brightness-75 md:p-4"
        src={img}
        alt=""
        loading="lazy"
        placeholder="Loading"
      />
      <div className="absolute flex flex-row justify-around hover:opacity-100 group-hover:opacity-100 opacity-0 font-semibold text-white top-1/2 right-1/2 translate-x-1/2">
        <div className="px-4 flex flex-col sm:flex-row items-center">
          <FavoriteIcon />
          <span className="px-2 py-2">2</span>
        </div>
        <div className="px-4 flex flex-col sm:flex-row items-center">
          <ModeCommentIcon />
          <span className="px-2 py-2">12</span>
        </div>
      </div>
    </ImageListItem>
  );
};

export default Eachimgexp;
