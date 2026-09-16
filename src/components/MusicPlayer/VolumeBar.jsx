import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { TbMicrophone2 } from "react-icons/tb";
import { addSongToPlaylist, getUserPlaylists } from "@/services/playlistApi";
import { toast } from "react-hot-toast";
import MiniLyricsModal from "./MiniLyricsModal";

const VolumeBar = ({
  value,
  min,
  max,
  onChange,
  setVolume,
  activeSong,
  bgColor,
  fullScreen,
  appTime = 0,
  setSeekTime,
  showLyrics,
  setShowLyrics,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [localShowLyrics, setLocalShowLyrics] = useState(false);
  const isLyricsOpen = showLyrics !== undefined ? showLyrics : localShowLyrics;
  const setLyricsOpen = setShowLyrics !== undefined ? setShowLyrics : setLocalShowLyrics;
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await getUserPlaylists();
      if (res?.success == true) {
        setPlaylists(res?.data?.playlists || []);
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

  return (
    <>
      <div className={`${fullScreen ? "hidden min-[1180px]:flex" : "hidden sm:flex"} flex-1 items-center justify-end gap-1`}>
        {/* Mini Player Lyrics Button */}
        {!fullScreen && (
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                e.currentTarget.blur();
                setLyricsOpen((prev) => !prev);
                setShowMenu(false);
              }}
              title="Lyrics"
              className={`p-2 transition-colors cursor-pointer rounded-full hover:bg-white/10 outline-none focus:outline-none focus:ring-0 ${
                isLyricsOpen ? "text-[#00e6e6]" : "text-white hover:text-[#00e6e6]"
              }`}
            >
              <TbMicrophone2 size={24} />
            </button>
          </div>
        )}

        {/* Add to Playlist Button & Floating Dialog */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              e.currentTarget.blur();
              setShowMenu((prev) => !prev);
              setLyricsOpen(false);
            }}
            title="Add to Playlist"
            className={`p-2 transition-colors cursor-pointer rounded-full hover:bg-white/10 outline-none focus:outline-none focus:ring-0 ${
              showMenu ? "text-[#00e6e6]" : "text-white hover:text-[#00e6e6]"
            }`}
          >
            <BiAddToQueue size={24} />
          </button>

          {showMenu && createPortal(
            <>
              {/* Click outside backdrop */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                }}
                className="fixed inset-0 z-[90]"
              />

              {/* Floating Add to Playlist Dialog */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="fixed bottom-24 right-4 sm:right-8 w-56 sm:w-64 rounded-xl shadow-2xl z-[100] overflow-hidden border border-white/10 p-3 flex flex-col gap-2 text-white animate-in fade-in slide-in-from-bottom-2 duration-150"
                style={{
                  backgroundColor: bgColor
                    ? `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.2)`
                    : "rgba(0,0,0,0.2)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                }}
              >
                <p className="text-sm font-semibold flex gap-1 border-b border-white/15 pb-2 items-center text-white">
                  Add to Playlist
                </p>
                {playlists?.length > 0 ? (
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-48 hideScrollBar">
                    {playlists?.map((playlist, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToPlaylist(activeSong?.id, playlist._id);
                        }}
                        className="text-sm text-gray-200 hover:text-[#00e6e6] hover:bg-white/10 px-2.5 py-1.5 rounded-lg text-left transition-colors truncate"
                      >
                        {playlist?.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 py-3 text-center">
                    No Playlists Found
                  </p>
                )}
              </div>
            </>,
            document.body
          )}
        </div>

        {value <= 1 && value > 0.5 && (
          <BsFillVolumeUpFill
            size={25}
            color="#FFF"
            className="cursor-pointer hover:text-[#00e6e6] transition-colors ml-2"
            onClick={(e) => {
              e.stopPropagation();
              setVolume(0);
            }}
          />
        )}
        {value <= 0.5 && value > 0 && (
          <BsVolumeDownFill
            size={25}
            className="cursor-pointer hover:text-[#00e6e6] transition-colors ml-2"
            color="#FFF"
            onClick={(e) => {
              e.stopPropagation();
              setVolume(0);
            }}
          />
        )}
        {value === 0 && (
          <BsFillVolumeMuteFill
            size={25}
            color="#FFF"
            className="cursor-pointer hover:text-[#00e6e6] transition-colors ml-2"
            onClick={(e) => {
              e.stopPropagation();
              setVolume(1);
            }}
          />
        )}
        <input
          onClick={(event) => {
            event.stopPropagation();
          }}
          type="range"
          step="any"
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          className="w-16 sm:w-20 md:w-24 h-1 ml-2 accent-[#00e6e6] cursor-pointer outline-none focus:outline-none focus:ring-0"
        />
      </div>

      {/* Floating Corner Lyrics Dialog */}
      {!fullScreen && (
        <MiniLyricsModal
          isOpen={isLyricsOpen}
          onClose={() => setLyricsOpen(false)}
          activeSong={activeSong}
          appTime={appTime}
          setSeekTime={setSeekTime}
          bgColor={bgColor}
        />
      )}
    </>
  );
};

export default VolumeBar;
