import { Grid } from "@mui/material";
import Userbox from "../components/userbox";
import { useMeQuery } from "../generated/graphql";

interface Props {}

const Direct = (props: Props) => {
  const [{ data }] = useMeQuery();
  return (
    <Grid
      container
      className="w-full border border-gray-300 dark:border-gray-600 rounded"
    >
      <Grid
        className="w-full border-r border-gray-300 dark:border-gray-600"
        item
        xs={12}
        md={4}
        display={{ xs: "block", md: "block" }}
      >
        <Grid
          item
          xs={0}
          md={12}
          display={{ xs: "none", md: "flex" }}
          className="border-b h-16 flex justify-center items-center font-semibold border-gray-300 dark:border-gray-600"
        >
          {data?.me && data.me.username}
        </Grid>
        <Grid item xs={12} display={{ xs: "none", md: "block" }}>
          <Userbox username="Ovaltine" type="inbox" />
          <Userbox username="Milo" type="inbox" />
        </Grid>
      </Grid>
      <Grid
        className="flex justify-center flex-1 items-center"
        item
        xs={12}
        md={8}
        display={{ xs: "block", md: "flex" }}
      >
        <div className="flex flex-col justify-center items-center text-gray-500">
          <span>You cannot send</span>
          <span>Message feature is not included</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default Direct;
