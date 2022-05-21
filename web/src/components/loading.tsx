import React from "react";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";

interface Props {}

const Loading = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Logo className="w-16 h-16 opacity-30 animate-pulse transition-all" />
    </div>
  );
};

export default Loading;
