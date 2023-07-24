"use client";
import SongList from "@/components/SongsList";
import { setProgress } from "@/redux/features/loadingBarSlice";
import { getplaylistData } from "@/services/dataAPI";
import React, { useEffect } from "react";
import { useState } from "react";
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
        <SongList SongData={playlistData?.songs} />
      </div>
    </div>
  );
};

export default page;
