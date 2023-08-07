'use client'
import React from 'react'
import { playPause, setActiveSong, setFullScreen } from "@/redux/features/playerSlice";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import SongListSkeleton from './SongListSkeleton';
import { BiHeadphone } from "react-icons/bi";
import { useSelector } from "react-redux";


const SongsList = ({SongData, loading, hidePlays}) => {
  const { activeSong } = useSelector((state) => state.player);
    const dispatch = useDispatch();
  const handlePlayClick = (song,index) => {
    dispatch(setActiveSong({ song, data: SongData, i: index }));
    dispatch(setFullScreen(true));
    dispatch(playPause(true));
    };

    function formatDuration(durationInSeconds) {
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.round(durationInSeconds % 60);
      
      if (minutes > 0) {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${seconds}`;
      }
    }
  return (
        <div className="mt-5">
          {
            !loading && SongData?.length > 0 ? (
          SongData?.map((song,index) => (
            <div key={index}
            onClick={() => {
                handlePlayClick(song,index);
            }}
             className={`flex items-center mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between ${activeSong?.id === song?.id && " text-[#00e6e6]"}`}>
                <div className="flex items-center gap-5">
              <div className=" relative mb-3">
                <img src={song?.image?.[2]?.link} alt={song?.name} width={50} height={50} className=""
                />
                {
                  activeSong?.id === song?.id ? (
                    <BiHeadphone size={27} className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00e6e6]" />
                  ) : (
                    <BsPlayFill
                    size={25}
                    className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                  />
                  )
                }
              
              </div>
              <div className=" w-24 md:w-64">
                <p className="text-sm lg:text-lg font-semibold truncate">{
                    song?.name?.replace("&#039;", "'")?.replace("&amp;", "&")
                }</p>
                <p className="text-gray-400 truncate text-xs">{song?.primaryArtists}</p>
              </div>
              </div>
              <div className={`hidden w-36 ${hidePlays ? 'lg:hidden':'lg:block'}`}>
                {song?.playCount && (
                    <p className="text-gray-400">{song?.playCount} plays</p>
                )}
                </div>
                <div>
                <p>{formatDuration(song?.duration)}</p>
                </div>
            </div>
          )
          ))
          : (
           <SongListSkeleton />
          )
          }
        </div>
  )
}

export default SongsList;