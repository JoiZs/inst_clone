import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { usePostmentMutation } from "../generated/graphql";
import Emojibtn from "./emojibtn";
import Loading from "./loading";
import { SiInstagram } from "react-icons/si";

interface Props {
  postID: string;
}

const Mentinp = (props: Props) => {
  const [ment, setMent] = useState("");
  const [curpos, setCurpos] = useState(0);
  const [{ fetching }, postment] = usePostmentMutation();

  const mentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurpos(e.currentTarget.selectionStart);

    setMent(e.currentTarget.value);
  };

  const onEmojiClick = (event: any, { emoji }: any) => {
    const stment = ment.substring(0, curpos);
    const edment = ment.substring(curpos);
    const text = stment + emoji + edment;

    setCurpos(curpos + emoji.length);
    setMent(text);
  };

  const cursorHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurpos(e.currentTarget.selectionStart);
  };

  const mentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postment({
      mentinp: {
        mentPostID: props.postID,
        mentText: ment,
      },
    });
    setMent("");
  };

  if (fetching)
    return (
      <div className="w-full h-full justify-center items-center">
        <SiInstagram className="animate-pulse" />
      </div>
    );

  return (
    <form
      onSubmit={mentSubmitHandler}
      className="flex py-2 px-4 items-center w-full"
    >
      <div className="cursor-pointer">
        <Emojibtn clickmoji={onEmojiClick} />
      </div>
      <div className="flex-1">
        <TextareaAutosize
          onChange={mentHandler}
          onSelect={cursorHandler}
          value={ment}
          maxRows={4}
          aria-label="empty textarea"
          placeholder="Add a comment"
          className="w-full outline-none text-sm px-4 resize-none bg-transparent"
        />
      </div>
      <button
        disabled={ment === ""}
        type="submit"
        className={`font-semibold ${
          ment === ""
            ? "text-sky-200 dark:text-indigo-400"
            : "text-sky-600 dark:text-indigo-200"
        } cursor-pointer`}
      >
        Post
      </button>
    </form>
  );
};

export default Mentinp;
