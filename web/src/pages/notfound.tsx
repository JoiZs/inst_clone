import React from "react";

interface Props {}

const Notfound = (props: Props) => {
  return (
    <div className="w-full text-center flex justify-center flex-col p-10">
      <span className="text-xl font-semibold">
        Sorry, this page isn't available.
      </span>
      <span>
        The link you followed may be broken, or the page may have been removed.
        Go back to Instagram.
      </span>
    </div>
  );
};

export default Notfound;
