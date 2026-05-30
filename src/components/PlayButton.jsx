"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { BsFillPlayFill } from "react-icons/bs";

import { playPause, setActiveSong } from "@/redux/features/playerSlice";
import BulkDownloadButton from "./BulkDownloadButton";

const PlayButton = ({ songList }) => {
  const dispatch = useDispatch();
  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data: songList?.songs, i: index }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-5 w-full sm:w-auto">
      <button
        type="button"
        onClick={() => {
          handlePlayClick(songList?.songs?.[0], 0);
        }}
        className="group relative overflow-hidden flex h-12 w-full sm:w-auto sm:min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/25 bg-[#06131f] px-5 sm:px-6 text-gray-100 shadow-[0_0_28px_rgba(0,230,230,0.12)] transition-all duration-300 hover:border-[#00e6e6]/70 hover:shadow-[0_0_30px_rgba(0,230,230,0.18)] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#00e6e6]/20 sm:min-w-[260px]"
      >
        <span className="absolute inset-y-0 left-0 w-0 bg-[#00e6e6]/10 transition-[width] duration-300 group-hover:w-full" />
        <div className="relative z-10 flex items-center gap-3">
          <BsFillPlayFill
            size={24}
            className="text-gray-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#00e6e6]"
          />
          <span className="text-sm sm:text-base lg:text-lg font-medium tracking-wide">
            Play
          </span>
        </div>
      </button>
      <BulkDownloadButton songList={songList} />
    </div>
  );
};

export default PlayButton;
