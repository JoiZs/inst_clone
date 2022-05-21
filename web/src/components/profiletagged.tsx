import React from "react";
import { TiTag } from "react-icons/ti";

interface Props {}

const Profiletagged = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="p-4 md:p-8">
        <TiTag className="h-20 w-20 rounded-full border-2 p-3" />
      </div>
      <div className="text-3xl font-thin p-4">Photos of you</div>
      <div>When people tag you in photos, they'll appear here.</div>
    </div>
  );
};

export default Profiletagged;
