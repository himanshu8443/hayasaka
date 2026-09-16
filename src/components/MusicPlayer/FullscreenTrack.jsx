import Lyrics from "./Lyrics";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setFullScreen } from "@/redux/features/playerSlice";
import { useSwipeable } from "react-swipeable";
import Controls from "./Controls";
import Seekbar from "./Seekbar";
import VolumeBar from "./VolumeBar";
import FavouriteButton from "./FavouriteButton";
import Downloader from "./Downloader";
import { TbMicrophone2 } from "react-icons/tb";
import { MdSkipNext, MdSkipPrevious, MdQueueMusic } from "react-icons/md";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

const decodeHtml = (str) => {
  if (!str) return "";
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};

const FullscreenTrack = ({
  fullScreen,
  activeSong,
  handlePrevSong,
  handleNextSong,
  handlePlayPause,
  isPlaying,
  isActive,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handleAddToFavourite,
  favouriteSongs,
  loading,
  appTime,
  duration,
  setSeekTime,
  volume,
  setVolume,
  bgColor,
}) => {
  const dispatch = useDispatch();
  const [mobileTab, setMobileTab] = useState("song");

  useEffect(() => {
    try {
      const savedTab = localStorage.getItem("fullscreenMobileTab");
      if (savedTab && ["song", "lyrics", "queue"].includes(savedTab)) {
        setMobileTab(savedTab);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleTabChange = (tab) => {
    setMobileTab(tab);
    try {
      localStorage.setItem("fullscreenMobileTab", tab);
    } catch (e) {
      // ignore
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextSong(),
    onSwipedRight: () => handlePrevSong(),
    onSwipedDown: () => dispatch(setFullScreen(false)),
    preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const primaryArtists = Array.isArray(activeSong?.artists?.primary)
    ? activeSong.artists.primary
    : Array.isArray(activeSong?.artists)
    ? activeSong.artists
    : [];

  const artistNames =
    primaryArtists.length > 0
      ? primaryArtists
          .map((artist) =>
            typeof artist === "string" ? artist.trim() : artist?.name?.trim()
          )
          .filter(Boolean)
          .join(", ")
      : typeof activeSong?.artists === "string"
      ? activeSong.artists
      : "Artist";

  return (
    <div
      className={`${
        fullScreen ? "flex" : "hidden"
      } w-full h-full flex-col justify-center max-w-[1550px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 xl:py-8`}
    >
      {/* Main Content Area */}
      <div className="flex-1 min-h-0 w-full flex min-[1180px]:flex-row items-center justify-center min-[1180px]:items-center min-[1180px]:justify-between gap-6 min-[1180px]:gap-12 xl:gap-20 py-2 sm:py-4 my-auto">
        {/* Left Column (Artwork, Track Info, Controls, Seekbar) */}
        <div
          className={`flex-col items-center justify-between w-full min-[1180px]:max-w-[620px] xl:max-w-[720px] 2xl:max-w-[820px] h-full min-[1180px]:h-[640px] xl:h-[700px] 2xl:h-[760px] min-[1180px]:max-h-[85vh] ${
            mobileTab !== "song" ? "hidden min-[1180px]:flex" : "flex"
          }`}
        >
          {/* Cover Art */}
          <div
            {...handlers}
            onClick={(e) => e.stopPropagation()}
            className="w-[min(70vw,280px)] h-[min(70vw,280px)] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] min-[1180px]:w-[480px] min-[1180px]:h-[480px] xl:w-[520px] xl:h-[520px] 2xl:w-[580px] 2xl:h-[580px] aspect-square flex-shrink-0 relative shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 mx-auto my-auto max-h-[36vh] sm:max-h-none border border-white/10 cursor-pointer"
          >
            <img
              src={
                activeSong?.image?.[2]?.url ||
                activeSong?.image?.[1]?.url ||
                activeSong?.image?.[0]?.url ||
                ""
              }
              alt="cover art"
              className="w-full h-full object-cover rounded-2xl select-none"
            />
          </div>

          {/* Song Info */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[540px] xl:max-w-[600px] 2xl:max-w-[660px] select-none my-2 px-3 sm:px-2 flex-shrink-0"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1 text-left sm:text-center">
                <p className="truncate text-white font-bold text-xl sm:text-2xl md:text-3xl tracking-tight leading-snug">
                  {decodeHtml(activeSong?.name || "Song")}
                </p>
                <p className="truncate text-gray-300 text-sm sm:text-base font-medium mt-0.5 leading-snug">
                  {primaryArtists.length > 0 ? (
                    primaryArtists.map((artist, index) => (
                      <React.Fragment key={artist?.id || index}>
                        {index > 0 ? ", " : ""}
                        <Link
                          className="hover:underline hover:text-white transition-colors"
                          href={`/artist/${artist?.id}`}
                          onClick={() => {
                            dispatch(setFullScreen(false));
                          }}
                        >
                          {artist?.name?.trim()}
                        </Link>
                      </React.Fragment>
                    ))
                  ) : typeof activeSong?.artists === "string" ? (
                    activeSong.artists
                  ) : (
                    "Artist"
                  )}
                </p>
              </div>

              {/* Mobile Quick Actions (Favourite & Downloader next to title) */}
              <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
                <FavouriteButton
                  favouriteSongs={favouriteSongs}
                  activeSong={activeSong}
                  loading={loading}
                  handleAddToFavourite={handleAddToFavourite}
                  size={26}
                />
                <Downloader
                  activeSong={activeSong}
                  fullScreen={fullScreen}
                  size={26}
                />
              </div>
            </div>
          </div>

          {/* Seekbar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex justify-center items-center flex-shrink-0 my-1"
          >
            <Seekbar
              value={appTime}
              min="0"
              max={duration}
              fullScreen={fullScreen}
              onInput={(event) => setSeekTime(event.target.value)}
              setSeekTime={setSeekTime}
              appTime={appTime}
            />
          </div>

          {/* Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex justify-center items-center my-1 sm:my-2 flex-shrink-0"
          >
            <Controls
              isPlaying={isPlaying}
              isActive={isActive}
              repeat={repeat}
              setRepeat={setRepeat}
              shuffle={shuffle}
              setShuffle={setShuffle}
              currentSongs={currentSongs}
              activeSong={activeSong}
              fullScreen={fullScreen}
              handlePlayPause={handlePlayPause}
              handlePrevSong={handlePrevSong}
              handleNextSong={handleNextSong}
              handleAddToFavourite={handleAddToFavourite}
              favouriteSongs={favouriteSongs}
              loading={loading}
            />
          </div>
        </div>

        {/* Mobile/Tablet Lyrics or Queue View (< 1180px when mobileTab !== "song") */}
        {mobileTab !== "song" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="min-[1180px]:hidden flex-1 min-h-0 w-full max-w-lg mx-auto flex flex-col h-full px-2"
          >
            <div className="w-full flex-1 min-h-0 flex flex-col">
              <Lyrics
                activeSong={activeSong}
                appTime={appTime}
                setSeekTime={setSeekTime}
                activeTab={mobileTab}
                hideHeaderTabs={true}
              />
            </div>

            {/* Sticky Bottom Mini Playback Controller while in Lyrics or Queue */}
            <div className="w-full flex items-center justify-between p-2.5 my-1 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 flex-shrink-0 shadow-xl">
              <div
                onClick={() => handleTabChange("song")}
                className="flex items-center min-w-0 flex-1 mr-3 cursor-pointer"
              >
                <img
                  src={
                    activeSong?.image?.[1]?.url ||
                    activeSong?.image?.[0]?.url ||
                    ""
                  }
                  alt="art"
                  className="w-10 h-10 rounded-lg object-cover mr-2.5 flex-shrink-0 border border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-white font-semibold text-xs leading-tight">
                    {decodeHtml(activeSong?.name || "Song")}
                  </p>
                  <p className="truncate text-gray-400 text-[11px] leading-tight mt-0.5">
                    {artistNames}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={handlePrevSong}
                  className="p-1.5 text-white/90 hover:text-white"
                  title="Previous"
                >
                  <MdSkipPrevious size={24} />
                </button>
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="p-1.5 text-[#00e6e6] hover:scale-105 active:scale-95 transition-transform"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <BsFillPauseFill size={30} />
                  ) : (
                    <BsFillPlayFill size={30} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNextSong}
                  className="p-1.5 text-white/90 hover:text-white"
                  title="Next"
                >
                  <MdSkipNext size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Queue & Lyrics + VolumeBar (Desktop >= 1180px) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex-col justify-between min-[1180px]:flex hidden flex-1 max-w-[500px] xl:max-w-[560px] 2xl:max-w-[620px] w-full min-[1180px]:h-[640px] xl:h-[700px] 2xl:h-[760px] min-[1180px]:max-h-[85vh]"
        >
          <div className="w-full flex-1 min-h-0 flex flex-col">
            <Lyrics
              activeSong={activeSong}
              appTime={appTime}
              setSeekTime={setSeekTime}
            />
          </div>
          <div className="w-full flex items-center justify-end pt-3 flex-shrink-0">
            <VolumeBar
              activeSong={activeSong}
              bgColor={bgColor}
              fullScreen={fullScreen}
              value={volume}
              min="0"
              max="1"
              onChange={(event) => setVolume(event.target.value)}
              setVolume={setVolume}
            />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Bottom 3-Tab Bar (< 1180px) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-[1180px]:hidden w-full flex items-center justify-center pt-2 pb-1 flex-shrink-0 z-20"
      >
        <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 backdrop-blur-xl shadow-lg">
          <button
            type="button"
            onClick={() => handleTabChange("song")}
            className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all ${
              mobileTab === "song"
                ? "bg-[#00e6e6] text-black shadow-md"
                : "text-white/70 hover:text-white"
            }`}
          >
            Song
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("lyrics")}
            className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              mobileTab === "lyrics"
                ? "bg-[#00e6e6] text-black shadow-md"
                : "text-white/70 hover:text-white"
            }`}
          >
            <TbMicrophone2 size={15} />
            Lyrics
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("queue")}
            className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              mobileTab === "queue"
                ? "bg-[#00e6e6] text-black shadow-md"
                : "text-white/70 hover:text-white"
            }`}
          >
            <MdQueueMusic size={16} />
            Queue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullscreenTrack;
