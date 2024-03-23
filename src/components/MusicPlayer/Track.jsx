import Link from "next/link";
import React from "react";

const Track = ({ isPlaying, isActive, activeSong, fullScreen }) => (
  <div
    className={`flex-1 flex items-center justify-start ${
      fullScreen ? "hidden" : ""
    }`}
  >
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_15s_linear_infinite]" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={
          activeSong?.image?.[2].url ||
          "https://res.cloudinary.com/dbr73rpz9/image/upload/v1690447758/chibi_qxvxq6.png"
        }
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className={`w-[190px] select-none cursor-pointer`}>
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.name
          ? activeSong?.name.replace("&#039;", "'").replace("&amp;", "&")
          : "Song"}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.artists?.primary
          ? activeSong?.artists?.primary?.map((artist, index) => (
              <React.Fragment key={index}>
                {artist?.name?.trim()}
              </React.Fragment>
            ))
          : "Artist"}
      </p>
    </div>
  </div>
);

export default Track;
