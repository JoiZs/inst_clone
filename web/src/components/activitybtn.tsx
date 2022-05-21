import { Popover } from "@headlessui/react";
import { ReactComponent as ActivityIcon } from "../assets/icons/activity.svg";
import { ReactComponent as None } from "../assets/icons/none.svg";

interface Props {}

const Activitybtn = (props: Props) => {
  return (
    <Popover className="relative flex justify-end">
      <Popover.Button>
        <ActivityIcon className="mx-2 cursor-pointer h-6 w-6 dark:fill-gray-300 dark:text-gray-300 hover:fill-red-500 hover:text-red-600" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 top-full mt-4">
        <div className="w-80 h-60 shadow bg-white   dark:bg-gray-500 rounded flex justify-center items-center flex-col">
          <None className="w-20 h-20 opacity-30" />
          <span className="opacity-30">No Activity</span>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default Activitybtn;
