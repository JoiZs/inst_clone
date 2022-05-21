import { BigHead } from "@bigheads/core";
import React from "react";

interface Props {}

const SearchUserbox = (props: Props) => {
  return (
    <div className="flex flex-row w-max p-2 cursor-pointer">
      <div className="w-14 h-14">
        <BigHead
          accessory="shades"
          body="chest"
          circleColor="blue"
          clothing="tankTop"
          clothingColor="black"
          eyebrows="angry"
          eyes="wink"
          facialHair="mediumBeard"
          graphic="react"
          hair="short"
          hairColor="black"
          hat="none"
          hatColor="green"
          lashes={false}
          lipColor="purple"
          mask={true}
          faceMask={true}
          mouth="open"
          skinTone="brown"
          faceMaskColor="blue"
        />
      </div>
      <div className="flex flex-col items-start text-sm px-2 justify-end flex-1">
        <span className="font-semibold">username</span>
        <span className="text-gray-500 dark:text-gray-400">fullname</span>
      </div>
    </div>
  );
};

export default SearchUserbox;
