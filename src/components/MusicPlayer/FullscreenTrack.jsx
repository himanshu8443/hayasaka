import Lyrics from "./Lyrics";
import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setFullScreen } from "@/redux/features/playerSlice";
import { useSwipeable } from "react-swipeable";

const FullscreenTrack = ({
  fullScreen,
  activeSong,
  handlePrevSong,
  handleNextSong,
}) => {
  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextSong(),
    onSwipedRight: () => handlePrevSong(),
    onSwipedDown: () => dispatch(setFullScreen(false)),
    preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      className={`${
        fullScreen ? "block" : "hidden"
      } w-full flex lg:h-full mr-auto flex-col mt-10 min-[1180px]:flex-row max-[1180px]:items-center min-[1180px]:justify-between max-w-7xl`}
    >
      <div className="flex flex-col h-full min-[1180px]:ml-[185px] w-fit items-center">
        <div
          {...handlers}
          className=" h-80 w-80 min-[1180px]:h-full min-[1180px]:w-[400px] sm:mt-5 "
        >
          <img
            src={activeSong?.image?.[2].url}
            alt="cover art"
            className="rounded-2xl"
          />
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-fit select-none cursor-pointer text-center my-5 ml"
        >
          <p className="truncate text-white font-bold text-2xl mx-3 mb-1">
            {activeSong?.name
              ? activeSong?.name.replace("&#039;", "'").replace("&amp;", "&")
              : "Song"}
          </p>
          <p className="truncate text-gray-300">
            {activeSong?.artists?.primary
              ? activeSong?.artists.primary?.map((artist, index) => (
                  <React.Fragment key={index}>
                    <Link
                      className=" hover:underline mx-1"
                      href={`/artist/${artist?.id}`}
                      onClick={() => {
                        dispatch(setFullScreen(false));
                      }}
                    >
                      {artist?.name?.trim()}
                    </Link>
                  </React.Fragment>
                ))
              : "Artist"}
          </p>
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex-col items-center min-[1180px]:flex hidden"
      >
        <Lyrics activeSong={activeSong} />
      </div>
    </div>
  );
};

export default FullscreenTrack;
