import { BigHead } from "@bigheads/core";

interface Props {
  isPage?: boolean;
}

const Sugguser = ({ isPage }: Props) => {
  return (
    <div className={`flex flex-row p-3 ${!isPage && "p-1 pr-0"}`}>
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
      <div className="flex flex-col items-start text-sm px-2 justify-center flex-1">
        <span className="font-semibold">username</span>
        {isPage && <span className="text-gray-400">Full name</span>}
        <span className="text-gray-400 text-xs">Followed by</span>
      </div>
      <div className="flex justify-center items-center">
        <button
          className={` rounded-md  font-semibold ${
            isPage
              ? "bg-sky-600 text-sm text-white px-2 p-1"
              : " text-sky-600 text-xs p-0"
          }`}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default Sugguser;
