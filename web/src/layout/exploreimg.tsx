/* eslint-disable no-restricted-globals */
import { Box, ImageList } from "@mui/material";
import Eachimgexp from "../components/eachimgexp";

interface Props {}

const Exploreimg = (props: Props) => {
  return (
    <Box>
      <ImageList
        variant="quilted"
        gap={1}
        cols={3}
        rowHeight={innerWidth >= 767 ? 309 : (innerWidth - 3) / 3}
      >
        <Eachimgexp type="small" />
        <Eachimgexp type="large" />
        <Eachimgexp type="small" />
      </ImageList>
    </Box>
  );
};

export default Exploreimg;
