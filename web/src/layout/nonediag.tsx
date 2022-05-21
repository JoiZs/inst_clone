import React from "react";

interface Props {}

const Nonediag = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-80 h-80 text-sm dark:bg-gray-600 dark:text-white">
      <span className="text-4xl p-2">Sorry</span>
      <span>No Featured</span>
    </div>
  );
};

export default Nonediag;
