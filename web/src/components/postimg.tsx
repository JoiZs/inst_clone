import React from "react";
import { Carousel } from "react-responsive-carousel";

interface Props {
  source:
    | {
        __typename?: "Content" | undefined;
        url: string;
      }[]
    | null
    | undefined;
  isCreate?: boolean;
  isCover?: boolean;
}

const Postimg = ({ source, isCreate, isCover }: Props) => {
  return (
    <div className="h-[25rem] md:h-[40rem] relative overflow-hidden">
      {source!.length > 1 ? (
        <Carousel
          className="h-full relative"
          showStatus={false}
          showThumbs={false}
          showArrows={true}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            const defStyle = {
              marginLeft: 4,
              color: "white",
              cursor: "pointer",
            };
            const style = isSelected
              ? { ...defStyle, background: "#0d9ef9" }
              : { ...defStyle };
            return (
              <span
                style={style}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                key={index}
                role="button"
                className="w-[0.4rem] h-[0.4rem] bg-gray-400 rounded-full"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
        >
          {source?.map((el, index) => (
            <div key={index} className="w-full h-full relative">
              <div className="w-full h-full absolute bg-zinc-100 dark:bg-zinc-900" />
              <img
                key={index}
                src={el.url}
                className={`w-full h-full ${
                  isCover ? "object-cover" : "object-contain"
                } object-center -translate-x-1/2 absolute shadow`}
                alt=""
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <>
          <div className="w-full h-full absolute bg-zinc-100 dark:bg-zinc-900" />

          <img
            className={`w-full h-full ${
              isCover ? "object-cover" : "object-contain"
            } ${!isCreate && "absolute "}`}
            src={source![0].url}
            alt=""
          />
        </>
      )}
    </div>
  );
};

export default Postimg;
