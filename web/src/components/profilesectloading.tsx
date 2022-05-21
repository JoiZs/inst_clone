import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

interface Props {}

const Profilesectloading = (props: Props) => {
  return (
    <div className="h-40 flex items-center justify-center">
      <div className="transform -translate-x-3">
        <FadeLoader height={12} margin={-5} width={3} color="gray" />
      </div>
    </div>
  );
};

export default Profilesectloading;
