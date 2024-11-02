import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { addSongToPlaylist, getUserPlaylists } from "@/services/playlistApi";
import { toast } from "react-hot-toast";

const VolumeBar = ({
  value,
  min = 0.5,
  max = 2.0,
  activeSong,
  bgColor,
  audioRef, // Pass in audio element ref to control playback speed
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [speed, setSpeedState] = useState(value || 1.0); // default speed
//i have to make changes here
  useEffect(() => {
    const getPlaylists = async () => {
      const res = await getUserPlaylists();
      if (res?.success === true) {
        setPlaylists(res?.data?.playlists);
      }
    };
    getPlaylists();
  }, []);

  const handleAddToPlaylist = async (song, playlistID) => {
    setShowMenu(false);
    const res = await addSongToPlaylist(playlistID, song);
    if (res?.success === true) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    console.log("the speed is:",newSpeed)
    setSpeedState(newSpeed);
    if (audioRef && audioRef.current) {
      audioRef.current.playbackRate = newSpeed; // Set playback speed directly
    }
  };

  return (
    <>
      <div className="hidden lg:flex flex-1 items-center justify-end">
        <div className="relative">
          <BiAddToQueue
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            title="Add to Playlist"
            size={25}
            color={"white"}
            className={`${!true ? "hidden sm:block" : " m-3"} cursor-pointer`}
          />
          {showMenu && (
            <div
              onClick={() => {
                setShowMenu(false);
              }}
              className="absolute text-white bottom-[130%] backdrop-blur-lg rounded-lg p-3 w-32 flex flex-col gap-2 z-[100]"
              style={{
                backgroundColor: bgColor
                  ? `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.3)`
                  : "rgba(0,0,0,0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              <p className="text-sm font-semibold flex gap-1 border-b border-white items-center">
                Add to Playlist
              </p>
              {playlists?.length > 0 ? (
                playlists?.map((playlist, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToPlaylist(activeSong?.id, playlist._id);
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

        <input
          onClick={(event) => {
            event.stopPropagation();
          }}
          type="range"
          step="0.2"
          value={speed}
          min={min}
          max={max}
          onChange={handleSpeedChange}
          className="2xl:w-24 lg:w-24 md:w-28 h-1 ml-2 accent-[#00e6e6] cursor-pointer"
        />
      </div>
      {showMenu && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(false);
          }}
          className=" absolute w-screen h-screen bottom-0 left-0 z-[50]"
        ></div>
      )}
    </>
  );
};

export default VolumeBar;
