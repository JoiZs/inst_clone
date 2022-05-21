import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { ReactComponent as Addpost } from "../assets/icons/addpost.svg";
import Emojibtn from "../components/emojibtn";
import Postimg from "../components/postimg";
import Userbox from "../components/userbox";
import { PostCreateContext } from "../context/postcreate";
import { useCreatePostMutation } from "../generated/graphql";

interface Props {}

const Postdiag = (props: Props) => {
  const [uploadedImg, setUploadedImg] = useState<{ url: string }[]>([]);
  const [caption, setCaption] = useState("");
  const [curpos, setCurpos] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, createpost] = useCreatePostMutation();
  const [, setIsOpen] = useContext(PostCreateContext);

  const uploadImgHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const countImg = e.currentTarget.files!.length;
    const images = e.currentTarget.files!;

    for (let x = 0; x < countImg; x++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(images[x]);
      fileReader.onloadend = ({ currentTarget: img }: any) => {
        setUploadedImg((prevImg) => [...prevImg, { url: img.result }]);
      };
    }
  };

  const capHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurpos(e.currentTarget.selectionStart);
    setCaption(e.currentTarget.value);
  };

  const cursorHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurpos(e.currentTarget.selectionStart);
  };

  const onEmojiClick = (event: any, { emoji }: any) => {
    const stcap = caption.substring(0, curpos);
    const edcap = caption.substring(curpos);
    const text = stcap + emoji + edcap;

    setCurpos(curpos + emoji.length);
    setCaption(text);
  };

  if (isUploaded) {
    return (
      <div className={"w-52 h-52 flex justify-center items-center"}>
        <span className="text-center">
          Uploaded <br />
          🎉
        </span>
      </div>
    );
  }

  return (
    <>
      {uploadedImg.length > 0 ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const res = await createpost({
              postcreateinp: { postText: caption, postContent: uploadedImg },
            });
            setIsLoading(false);

            if (res.data?.createPost.data) {
              setIsUploaded(true);
              setTimeout(() => {
                setIsOpen(false);
              }, 2000);
            }
            document.documentElement.focus();
          }}
          className={`flex flex-col dark:bg-gray-600 dark:text-white  ${
            isLoading && "animate-pulse duration-[5000ms]"
          }`}
        >
          <div className="flex items-center h-10 font-semibold border-b border-gray-300 dark:border-gray-500">
            <div className="w-14" />
            <span className="flex-1 flex justify-center">Create new post</span>
            <button
              type="submit"
              className="font-semibold text-sm text-sky-500 px-2"
            >
              Share
            </button>
          </div>
          <Grid container>
            <Grid
              item
              xs={12}
              md={8}
              className="flex items-center border-r border-gray-300 dark:border-gray-500"
            >
              <Postimg isCreate={true} source={uploadedImg} />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className="overflow-y-scroll hiddenscroll"
            >
              <div className="w-full  border-b dark:border-gray-400">
                <Userbox type="create" />
                <textarea
                  className="outline-none resize-none px-2 h-52 dark:bg-gray-600"
                  placeholder="Write a caption..."
                  onSelect={cursorHandler}
                  onChange={capHandler}
                  value={caption}
                />
                <Emojibtn iscreate={true} clickmoji={onEmojiClick} />
              </div>
            </Grid>
          </Grid>
        </form>
      ) : (
        <div className="flex flex-col w-80 h-96 text-sm dark:bg-gray-600 dark:text-white">
          <div className="flex justify-center border-b dark:border-gray-400 py-2 font-semibold">
            Create new post
          </div>
          <div className="flex-1 flex flex-col opacity-70 justify-center items-center">
            <Addpost />
            <span className="m-2 text-base">
              Add photos to create a new post
            </span>
            <label
              htmlFor="file"
              className=" text-white cursor-pointer font-semibold p-1 px-2 rounded-md bg-red-600"
            >
              Select images
            </label>
            <input
              onInputCapture={uploadImgHandler}
              className="hidden"
              type={"file"}
              id="file"
              multiple
              accept="image/png,image/jpg,image/jpeg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Postdiag;
