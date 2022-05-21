import { Popover } from "@headlessui/react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import { ReactComponent as Emoji } from "../assets/icons/emoji.svg";

interface Props {
  clickmoji: (event: any, emojiObject: any) => void;
  iscreate?: boolean;
}

const Emojibtn = (props: Props) => {
  return (
    <Popover className="relative">
      <Popover.Button>
        <Emoji
          type="button"
          className="dark:text-gray-300 dark:fill-gray-300"
        />
      </Popover.Button>
      <Popover.Panel
        className={`absolute z-10 bottom-full ${props.iscreate && "top-full"}`}
      >
        <Picker
          pickerStyle={{ boxShadow: "2px 1px 5px 1px #00000020" }}
          onEmojiClick={props.clickmoji}
          disableAutoFocus={false}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{
            smileys_people: "yellow faces",
            animals_nature: "cute dogs and also trees",
            food_drink: "milkshakes and more",
            travel_places: "I love trains",
            activities: "lets play a game",
            objects: "stuff",
            symbols: "more stuff",
            flags: "fun with flags",
            recently_used: "did I really use those?!",
          }}
          native
        />
      </Popover.Panel>
    </Popover>
  );
};

export default Emojibtn;
