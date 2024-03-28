"use client";
import React from "react";
import {
  playPause,
  setActiveSong,
  setFullScreen,
} from "@/redux/features/playerSlice";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import SongListSkeleton from "./SongListSkeleton";
import { BiHeadphone } from "react-icons/bi";
import { useSelector } from "react-redux";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useState } from "react";
import {
  addSongToPlaylist,
  deleteSongFromPlaylist,
  getUserPlaylists,
} from "@/services/playlistApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SongsList = ({
  SongData,
  loading,
  hidePlays,
  isUserPlaylist,
  playlistID,
  setSongs,
}) => {
  console.log("SongData", SongData);
  const { activeSong } = useSelector((state) => state.player);
  const [showMenu, setShowMenu] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data: SongData, i: index }));
    dispatch(setFullScreen(true));
    dispatch(playPause(true));
  };

  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.round(durationInSeconds % 60);

    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${seconds}`;
    }
  }

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await getUserPlaylists();
      if (res?.success == true) {
        setPlaylists(res?.data?.playlists);
      }
    };
    getPlaylists();
  }, []);

  // add song to playlist
  const handleAddToPlaylist = async (song, playlistID) => {
    setShowMenu(false);
    const res = await addSongToPlaylist(playlistID, song);
    if (res?.success == true) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  // delete song from playlist
  const handleDeleteFromPlaylist = async (playlistID, song) => {
    setShowMenu(false);
    const res = await deleteSongFromPlaylist(playlistID, song);
    if (res?.success == true) {
      setSongs((prev) => {
        return prev.filter((s) => s?.id?.toString() !== song.toString());
      });
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <>
      <div className="mt-5">
        {!loading && SongData?.length > 0 ? (
          SongData?.map((song, index) => (
            <div
              key={song?.id}
              onClick={() => {
                handlePlayClick(song, index);
              }}
              className={`flex items-center mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between ${
                activeSong?.id === song?.id && " text-[#00e6e6]"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className=" relative mb-3">
                  <img
                    src={song?.image?.[2]?.url}
                    alt={song?.name}
                    width={50}
                    height={50}
                    className=" rounded-lg w-12 h-12 md:w-14 md:h-14 object-cover"
                  />
                  {activeSong?.id === song?.id ? (
                    <BiHeadphone
                      size={27}
                      className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00e6e6]"
                    />
                  ) : (
                    <BsPlayFill
                      size={25}
                      className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                    />
                  )}
                </div>
                <div className=" w-24 md:w-64">
                  <p className="text-sm lg:text-lg font-semibold truncate">
                    {song?.name
                      ?.replace("&#039;", "'")
                      ?.replaceAll("&amp;", "&")}
                  </p>
                  <p className="text-gray-400 truncate text-xs">
                    {song?.artists?.primary
                      ?.map((artist) => artist.name)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div
                className={`hidden w-36 ${
                  hidePlays ? "lg:hidden" : "lg:block"
                }`}
              >
                {song?.playCount && (
                  <p className="text-gray-400">{song?.playCount} plays</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <p>{formatDuration(song?.duration)}</p>
                <div className=" flex gap-2 items-center relative">
                  <PiDotsThreeVerticalBold
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(song?.id);
                    }}
                    size={25}
                    className=" text-gray-300"
                  />
                  {showMenu === song?.id && (
                    <div
                      onClick={() => {
                        setShowMenu(false);
                      }}
                      className="absolute text-white top-0 right-0 bg-black/50 bg-opacity-80 backdrop-blur-sm rounded-lg p-3 w-32 flex flex-col gap-2 z-40"
                    >
                      <p className="text-sm font-semibold flex gap-1 empty:hidden border-b border-white items-center">
                        {isUserPlaylist ? null : "Add to playlist"}
                      </p>
                      {isUserPlaylist ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFromPlaylist(playlistID, song?.id);
                          }}
                          className="text-sm font-semibold flex gap-1 items-center hover:underline"
                        >
                          <MdOutlineDeleteOutline size={20} /> Remove
                        </button>
                      ) : playlists?.length > 0 ? (
                        playlists?.map((playlist, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToPlaylist(song?.id, playlist._id);
                            }}
                            className="text-sm font-semibold flex gap-1 items-center hover:underline"
                          >
                            {playlist?.name}
                          </button>
                        ))
                      ) : (
                        <p className="text-sm font-semibold flex gap-1 items-center">
                          No Playlist
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <SongListSkeleton />
        )}
      </div>
      {/* overlay */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed top-0 left-0 w-full h-full z-30"
        ></div>
      )}
    </>
  );
};

export default SongsList;
