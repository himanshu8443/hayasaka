"use client";
import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { TbRepeat, TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";
import Downloader from "./Downloader";
import FavouriteButton from "./FavouriteButton";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
  activeSong,
  fullScreen,
  handleAddToFavourite,
  favouriteSongs,
  loading,
}) => {
  return (
    <div
      className={`flex items-center justify-around ${
        fullScreen
          ? "w-full max-w-[440px] sm:max-w-[520px] xl:max-w-[580px] px-2"
          : "w-full max-w-xs md:max-w-sm gap-2 sm:gap-4 md:gap-6"
      }`}
    >
      <FavouriteButton
        favouriteSongs={favouriteSongs}
        activeSong={activeSong}
        loading={loading}
        handleAddToFavourite={handleAddToFavourite}
        style={" sm:block hidden"}
        size={fullScreen ? 28 : 25}
      />
      {!repeat ? (
        <TbRepeat
          title="Repeat"
          size={fullScreen ? 28 : 25}
          color={"white"}
          onClick={(e) => {
            e.stopPropagation();
            setRepeat((prev) => !prev);
          }}
          className={`${
            !fullScreen ? "hidden sm:block" : "m-2 sm:m-3"
          } cursor-pointer hover:scale-110 transition-transform`}
        />
      ) : (
        <TbRepeatOnce
          title="Repeat Once"
          size={fullScreen ? 28 : 25}
          color={repeat ? "#00e6e6" : "white"}
          onClick={(e) => {
            e.stopPropagation();
            setRepeat((prev) => !prev);
          }}
          className={`${
            !fullScreen ? "hidden sm:block" : "m-2 sm:m-3"
          } cursor-pointer hover:scale-110 transition-transform`}
        />
      )}

      {
        <MdSkipPrevious
          title="Previous"
          size={fullScreen ? 44 : 35}
          color={currentSongs?.length ? "#ffff" : "#b3b3b3"}
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={handlePrevSong}
        />
      }
      {isPlaying ? (
        <BsFillPauseFill
          size={fullScreen ? 58 : 45}
          color="#00e6e6"
          onClick={handlePlayPause}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      ) : (
        <BsFillPlayFill
          size={fullScreen ? 58 : 45}
          color="#00e6e6"
          onClick={handlePlayPause}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      )}
      {
        <MdSkipNext
          title="Next"
          size={fullScreen ? 44 : 35}
          color={currentSongs?.length ? "#ffff" : "#b3b3b3"}
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={handleNextSong}
        />
      }
      <TbArrowsShuffle
        title="Shuffle"
        size={fullScreen ? 28 : 25}
        color={shuffle ? "#00e6e6" : "white"}
        onClick={(e) => {
          e.stopPropagation();
          setShuffle((prev) => !prev);
        }}
        className={`${
          !fullScreen ? "hidden sm:block" : "m-2 sm:m-3"
        } cursor-pointer hover:scale-110 transition-transform`}
      />
      {activeSong?.downloadUrl?.[4]?.url && (
        <div className=" hidden sm:block mt-1 ">
          <Downloader
            activeSong={activeSong}
            fullScreen={fullScreen}
            size={fullScreen ? 28 : 25}
          />
        </div>
      )}
    </div>
  );
};

export default Controls;
