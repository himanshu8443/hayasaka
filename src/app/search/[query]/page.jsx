"use client";
import SwiperLayout from "@/components/Homepage/Swiper";
import SongCard from "@/components/Homepage/SongCard";
import { getSearchedData, getSongData } from "@/services/dataAPI";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  playPause,
  setActiveSong,
  setFullScreen,
} from "@/redux/features/playerSlice";
import Image from "next/image";
import Link from "next/link";
import SongListSkeleton from "@/components/SongListSkeleton";
import { setProgress } from "@/redux/features/loadingBarSlice";

const page = ({ params }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(params.query);
  const [searchedData, setSearchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentSongs } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setProgress(70));
      const response = await getSearchedData(query);
      setSearchedData(response);
      setLoading(false);
      dispatch(setProgress(100));
    };
    fetchData();
  }, [query]);

  const handlePlayClick = async (song) => {
    if (song?.type === "song") {
      const Data = await getSongData(song?.id);
      const songData = Array.isArray(Data) ? Data[0] : Data;
      dispatch(
        setActiveSong({
          song: songData,
          data: currentSongs?.find((s) => s?.id === songData?.id)
            ? currentSongs
            : [...currentSongs, songData],
          i: currentSongs?.find((s) => s?.id === songData?.id)
            ? currentSongs?.findIndex((s) => s?.id === songData?.id)
            : currentSongs?.length,
        })
      );
      dispatch(setFullScreen(true));
      dispatch(playPause(true));
    }
  };

  const songResults = Array.isArray(searchedData?.songs?.results)
    ? searchedData.songs.results
    : Array.isArray(searchedData?.songs)
    ? searchedData.songs
    : [];

  const albumResults = Array.isArray(searchedData?.albums?.results)
    ? searchedData.albums.results
    : Array.isArray(searchedData?.albums)
    ? searchedData.albums
    : [];

  const artistResults = Array.isArray(searchedData?.artists?.results)
    ? searchedData.artists.results
    : Array.isArray(searchedData?.artists)
    ? searchedData.artists
    : [];

  const playlistResults = Array.isArray(searchedData?.playlists?.results)
    ? searchedData.playlists.results
    : Array.isArray(searchedData?.playlists)
    ? searchedData.playlists
    : [];

  return (
    <div>
      <div className="w-11/12 m-auto mt-16">
        <div className="mt-10 text-gray-200">
          <h1 className="text-3xl font-bold">
            Search results for "{decodeURIComponent(query || "").replaceAll("%20", " ")}"
          </h1>
          <div className="mt-10 text-gray-200">
            <h2 className="text-lg lg:text-4xl font-semibold">Songs</h2>
            {loading ? (
              <SongListSkeleton />
            ) : songResults.length > 0 ? (
              <div className="mt-5">
                {songResults.map((song, index) => (
                  <div
                    key={song?.id || index}
                    onClick={() => {
                      handlePlayClick(song);
                    }}
                    className="flex items-center  mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <div className=" relative">
                        <img
                          src={song?.image?.[2]?.url || song?.image?.[1]?.url || song?.image?.[0]?.url || ""}
                          alt={song?.title || song?.name}
                          width={50}
                          height={50}
                          className="mb-3 rounded object-cover"
                        />
                        <BsPlayFill
                          size={25}
                          className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                        />
                      </div>
                      <div className="w-32 lg:w-80">
                        <p className="text-sm lg:text-lg font-semibold truncate">
                          {(song?.title || song?.name)
                            ?.replace("&#039;", "'")
                            ?.replace("&amp;", "&")}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:block max-w-56">
                      {song?.primaryArtists && (
                        <p className="text-gray-400 truncate">
                          By: {song?.primaryArtists}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mt-2">No songs found</p>
            )}
          </div>

          <div className="mt-10 text-gray-200">
            <SwiperLayout title={"Albums"}>
              {albumResults.map((album, index) => (
                <SwiperSlide key={album?.id || index}>
                  <SongCard song={album} />
                </SwiperSlide>
              ))}
            </SwiperLayout>
          </div>
          <div className="mt-10 text-gray-200">
            <SwiperLayout title={"Artists"}>
              {artistResults.map((artist, index) => (
                <SwiperSlide key={artist?.id || index}>
                  <Link href={`/artist/${artist?.id}`}>
                    <div className=" flex flex-col justify-center items-center">
                      <img
                        src={artist?.image?.[2]?.url || artist?.image?.[1]?.url || artist?.image?.[0]?.url || ""}
                        alt={artist?.name || artist?.title}
                        width={200}
                        height={200}
                        className="rounded-full w-32 h-32 lg:w-48 lg:h-48 object-cover"
                      />
                      <p className="lg:text-base lg:w-44 w-24 text-center text-xs font-semibold mt-3 truncate">
                        {(artist?.title || artist?.name)?.replace("&amp;", "&")}
                      </p>
                      <div>
                        {artist?.description && (
                          <p className="text-gray-400 truncate text-[8px] lg:text-xs">
                            {artist?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </SwiperLayout>
          </div>
          <div className="mt-10 text-gray-200">
            <SwiperLayout title={"Playlists"}>
              {playlistResults.map((playlist, index) => (
                <SwiperSlide key={playlist?.id || index}>
                  <SongCard song={playlist} />
                </SwiperSlide>
              ))}
            </SwiperLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
