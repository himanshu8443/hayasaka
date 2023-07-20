"use client";
import { setProgress } from "@/redux/features/loadingBarSlice";
import { playPause, setActiveSong } from "@/redux/features/playerSlice";
import { getplaylistData } from "@/services/dataAPI";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const page = ({ params }) => {
  const [playlistData, setPlaylistData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
        dispatch(setProgress(50));
      const response = await getplaylistData(params.playlistId);
      dispatch(setProgress(100));
      console.log(response);
    setPlaylistData(response);
    };
    fetchData();
  }, []);

// Utility function to format the duration in seconds to "m:ss" format (without leading zero for minutes)
function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.round(durationInSeconds % 60);
    
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${seconds}`;
    }
  }

    const handlePlayClick = (song,index) => {
        dispatch(setActiveSong({ song, data: playlistData?.songs, i: index }));
        dispatch(playPause(true));
        };
  

  return (
    <div className="w-11/12 m-auto mt-16">
      <div className=" flex flex-col lg:flex-row items-center">
        <img className=" rounded-full"
          src={playlistData?.image?.[2]?.link}
          alt={playlistData?.title}
          width={300}
          height={300}
        />
        <div className="lg:ml-10 text-gray-100 mt-12">
          <h1 className=" text-xl lg:text-4xl font-bold">{playlistData?.name}</h1>
          <ul className="flex items-center gap-3 text-gray-300">
            <li className="text-lg font-semibold">• {playlistData?.followerCount} followers</li>
            <li className="text-lg font-semibold">
              • {playlistData?.songCount} songs
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-gray-200">
        <h1 className="text-3xl font-bold">Songs</h1>
        <div className="mt-5">
          {playlistData?.songs?.map((song,index) => (
            <div
            onClick={() => {
                handlePlayClick(song,index);
            }
            }
             className="flex items-center  mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between">
                <div className="flex items-center gap-5">
              <div className=" relative">
                <img src={song?.image?.[2]?.link} alt={song?.name} width={50} height={50} className="rounded- mb-3"
                />
                {/* <p className=" group-hover:hidden font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200">
                    {index+1}.
                </p> */}
                <BsPlayFill
                  size={25}
                  className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                />
              </div>
              <div className=" w-32 lg:w-80">
                <h1 className=" text-sm lg:text-lg font-semibold truncate">{
                    song?.name.replace("&#039;", "'").replace("&amp;", "&")
                }</h1>
              </div>
              </div>
              <div className=" hidden lg:block w-40">
                {song?.playCount && (
                    <p className="text-gray-400">{song?.playCount} plays</p>
                )}
                </div>
                <div>
                <p>{formatDuration(song?.duration)}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
