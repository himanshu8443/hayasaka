"use client";
import SongList from "@/components/SongsList";
import { setProgress } from "@/redux/features/loadingBarSlice";
import { getplaylistData } from "@/services/dataAPI";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {BsFillPlayFill} from 'react-icons/bs'
import { setActiveSong, playPause } from "@/redux/features/playerSlice";

const page = ({ params }) => {
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data: playlistData?.songs, i: index }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setProgress(50));
      const response = await getplaylistData(params.playlistId);
      dispatch(setProgress(100));
      setPlaylistData(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="w-11/12 m-auto mt-16">
      <div className=" flex flex-col lg:flex-row items-center">
        {
          loading ? (
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
            <div className="flex rounded-full items-center justify-center w-[300px] h-[300px] bg-gray-300 dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
        </div>
        </div>
          ) : (
            <img className=" rounded-full"
            src={playlistData?.image?.[2]?.link}
            alt={playlistData?.title}
            width={300}
            height={300}
          />
          )
        }
     
        <div className="lg:ml-10 text-gray-100 mt-12 flex flex-col gap-2 items-center md:items-start">
          <h1 className=" text-xl lg:text-4xl font-bold">{playlistData?.name}</h1>
          <ul className="flex items-center gap-3 text-gray-300">
            <li className="text-lg font-semibold">• {playlistData?.followerCount} followers</li>
            <li className="text-lg font-semibold">
              • {playlistData?.songCount} songs
            </li>
          </ul>
          <div 
          onClick={() => {handlePlayClick(playlistData?.songs?.[0], 0);}}
           className="flex items-center gap-2 mt-5 rounded-3xl py-2 px-3 hover:border-[#00e6e6] group w-fit cursor-pointer border border-white">
            <BsFillPlayFill size={25} className="text-gray-200 group-hover:text-[#00e6e6]" />
            <p className="text-lg font-semibold">Play</p>
            </div>
        </div>
      </div>
      <div className="mt-10 text-gray-200">
        <h1 className="text-3xl font-bold">Songs</h1>
        <SongList SongData={playlistData?.songs} loading={loading} />
      </div>
    </div>
  );
};

export default page;
