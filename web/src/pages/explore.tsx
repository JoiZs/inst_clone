import React from "react";
import { Helmet } from "react-helmet";
import Exploreimg from "../layout/exploreimg";

interface Props {}

const Explore = (props: Props) => {
  return (
    <div>
      <Helmet>
        <title>Explore</title>
      </Helmet>
      <Exploreimg />
    </div>
  );
};

export default Explore;
