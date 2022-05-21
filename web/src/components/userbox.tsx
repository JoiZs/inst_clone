import { BigHead } from "@bigheads/core";
import { ReactComponent as More } from "../assets/icons/more.svg";

interface Props {
  type?: "inbox" | "post" | "create" | "";
  username?: string;
}

const Userbox = (props: Props) => {
  return (
    <div className="flex flex-row py-1 w-full">
      <div
        className={`${
          props.type === "post" || "create" ? "w-14 h-14" : "w-20 h-20"
        }`}
      >
        <BigHead
          accessory="shades"
          body="chest"
          circleColor="blue"
          clothing="vneck"
          clothingColor="black"
          eyebrows="angry"
          eyes="wink"
          facialHair="mediumBeard"
          graphic="react"
          hair="bob"
          hairColor="black"
          hat="none2"
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
        {props.username}
        <span className="text-gray-500">
          {props.type === "post" || "create" ? "" : "fullname"}
        </span>
      </div>

      {props.type === "inbox" || "create" ? (
        ""
      ) : props.type === "post" ? (
        <div className="flex justify-center m-4 items-center font-semibold text-sky-600">
          <More />
        </div>
      ) : (
        <div className="flex justify-center items-center font-semibold text-sky-600">
          Switch
        </div>
      )}
    </div>
  );
};

export default Userbox;
