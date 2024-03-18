"use client";
import { setProgress } from "@/redux/features/loadingBarSlice";
import { playPause, setActiveSong } from "@/redux/features/playerSlice";
import { getAlbumData } from "@/services/dataAPI";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { BsFillPlayFill } from "react-icons/bs";

const page = ({ params }) => {
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setProgress(50));
      const response = await getAlbumData(params.albumId);
      dispatch(setProgress(100));
      // console.log(response);
      setAlbumData(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Utility function to format the duration in seconds to "m:ss" format (without leading zero for minutes)
  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.round(durationInSeconds % 60);

    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
        {loading ? (
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex rounded-lg items-center justify-center w-[300px] h-[300px] bg-gray-300 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        ) : (
          <img
            className=" rounded-lg"
            src={albumData?.image?.[2]?.url}
            alt={albumData?.title}
            width={300}
            height={300}
          />
        )}

        <div className=" lg:ml-10 text-gray-100 mt-12 flex flex-col gap-2">
          <h1 className="text-xl lg:text-4xl font-bold">{albumData?.name}</h1>
          <h2 className="text-xl font-semibold">{albumData?.subtitle}</h2>
          <h3 className="text-xl font-semibold cursor-pointer">
            {albumData?.primaryArtists?.split(",")?.map((artist, index) => (
              <React.Fragment key={index}>
                <Link
                  className=" hover:underline"
                  href={`/artist/${albumData?.primaryArtistsId
                    ?.split(",")
                    [index]?.trim()}`}
                >
                  {artist?.trim()?.replaceAll("&amp;", "&")}
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
          <div
            onClick={() => {
              handlePlayClick(albumData?.songs?.[0], 0);
            }}
            className="flex items-center gap-2 mt-5 group rounded-3xl py-2 px-3 hover:border-[#00e6e6] w-fit cursor-pointer border border-white"
          >
            <BsFillPlayFill
              size={25}
              className="text-gray-200 group-hover:text-[#00e6e6]"
            />
            <p className="text-lg font-semibold">Play</p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-gray-200">
        <h1 className="text-3xl font-bold">Songs</h1>
        <div className="mt-5">
          {albumData?.songs?.map((song, index) => (
            <div
              key={song?.id}
              onClick={() => {
                handlePlayClick(song, index);
              }}
              className="flex items-center  mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between"
            >
              <div className="flex items-center gap-5">
                <div className=" relative">
                  <div className=" w-10 h-10" />
                  <p className=" group-hover:hidden font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200">
                    {index + 1}.
                  </p>
                  <BsPlayFill
                    size={25}
                    className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                  />
                </div>
                <div className=" w-32 lg:w-80">
                  <p className=" text-sm lg:text-lg font-semibold truncate">
                    {song?.name.replace("&#039;", "'").replace("&amp;", "&")}
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
