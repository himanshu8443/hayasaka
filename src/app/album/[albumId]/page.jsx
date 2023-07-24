"use client";
import { setProgress } from "@/redux/features/loadingBarSlice";
import { playPause, setActiveSong } from "@/redux/features/playerSlice";
import { getAlbumData } from "@/services/dataAPI";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const page = ({ params }) => {
  const [albumData, setAlbumData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setProgress(50));
      const response = await getAlbumData(params.albumId);
      dispatch(setProgress(100));
      // console.log(response);
      setAlbumData(response);
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

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data: albumData?.songs, i: index }));
    dispatch(playPause(true));
  };


  return (
    <div className="w-11/12 m-auto mt-16">
      <div className=" flex flex-col lg:flex-row items-center">
        <img className=" rounded-lg"
          src={albumData?.image?.[2]?.link}
          alt={albumData?.title}
          width={300}
          height={300}
        />
        <div className=" lg:ml-10 text-gray-100 mt-12">
          <h1 className="text-xl lg:text-4xl font-bold">{albumData?.name}</h1>
          <h2 className="text-xl font-semibold">{albumData?.subtitle}</h2>
          <h3 className="text-xl font-semibold cursor-pointer">
            {albumData?.primaryArtists?.split(",")?.map((artist, index) => (
              <React.Fragment key={index}>
                <Link className=" hover:underline" href={`/artist/${albumData?.primaryArtistsId?.split(",")[index]?.trim()}`}>
                  {artist?.trim()}
                </Link>
                {index < albumData.primaryArtists.split(",").length - 1 && ", "}
              </React.Fragment>
            ))}
          </h3>
          <ul className="flex items-center gap-3 text-gray-300">
            <li className="text-lg font-semibold">• {albumData?.year}</li>
            <li className="text-lg font-semibold">
              • {albumData?.songCount} songs
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-gray-200">
        <h1 className="text-3xl font-bold">Songs</h1>
        <div className="mt-5">
          {albumData?.songs?.map((song, index) => (
            <div key={song?.id}
              onClick={() => {
                handlePlayClick(song, index);
              }
              }
              className="flex items-center  mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between">
              <div className="flex items-center gap-5">
                <div className=" relative">
                  <div className=" w-10 h-10"
                  />
                  <p className=" group-hover:hidden font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200">
                    {index + 1}.
                  </p>
                  <BsPlayFill
                    size={25}
                    className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                  />
                </div>
                <div className=" w-32 lg:w-80">
                  <p className=" text-sm lg:text-lg font-semibold truncate">{song?.name.replace("&#039;", "'").replace("&amp;", "&")}
                  </p>
                </div>
              </div>
              <div className=" hidden lg:block w-28">
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
