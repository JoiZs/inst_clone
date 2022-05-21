import React from "react";

interface Props {
  placetext: string;
  inputRdy: string;
  setInputRdy: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

export const Inputele = (props: Props) => {
  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: (value: React.SetStateAction<string>) => void
  ) => {
    set(e.currentTarget.value);
  };

  return (
    <div className="group flex justify-center  h-9 my-1 relative">
      <input
        type={props.type}
        onChange={(e) => inputChange(e, props.setInputRdy)}
        className="peer bg-gray-50 dark:bg-zinc-600 w-64 rounded-sm border focus:outline-double pt-3 px-2 outline-gray-400"
      />
      <span
        className={` absolute tracking-wide opacity-25 w-64 px-2 peer-focus:scale-75 peer-focus:-translate-x-8 peer-focus:top-2 transition-all ease-in-out transform pointer-events-none -translate-y-1/2 top-1/2 ${
          !!props.inputRdy ? " scale-75 -translate-x-8 top-[0.5rem] " : " "
        }`}
      >
        {props.placetext}
      </span>
    </div>
  );
};
