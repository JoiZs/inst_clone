import React from "react";
import Sugguser from "../components/sugguser";

interface Props {}

const Sugpeople = (props: Props) => {
  return (
    <div className="max-w-xl m-auto w-full h-full pt-14">
      <h1 className="font-semibold">Suggested</h1>
      <div className="bg-white dark:bg-gray-500">
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
        <Sugguser isPage={true} />
      </div>
    </div>
  );
};

export default Sugpeople;
