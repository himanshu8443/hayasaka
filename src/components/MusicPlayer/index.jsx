"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextSong,
  prevSong,
  playPause,
  setFullScreen,
  resetOpenedByClick,
} from "../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";
import FullscreenTrack from "./FullscreenTrack";
import Lyrics from "./Lyrics";
import Downloader from "./Downloader";
import { HiOutlineChevronDown } from "react-icons/hi";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { addFavourite, getFavourite } from "@/services/dataAPI";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FavouriteButton from "./FavouriteButton";
import getPixels from "get-pixels";
import { extractColors } from "extract-colors";

const MusicPlayer = () => {
  const {
    activeSong,
    currentSongs,
    currentIndex,
    isActive,
    isPlaying,
    fullScreen,
    openedByClick,
  } = useSelector((state) => state.player);
  const { isTyping } = useSelector((state) => state.loadingBar);
  const autoOpenFullscreen = useSelector(
    (state) => state.settings?.autoOpenFullscreen
  );
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSession();
  const router = useRouter();
  const [bgColor, setBgColor] = useState();
  const [showLyrics, setShowLyrics] = useState(false);

  // Restore persisted volume, repeat, shuffle from localStorage
  useEffect(() => {
    try {
      const savedVolume = localStorage.getItem("playerVolume");
      if (savedVolume !== null && !isNaN(parseFloat(savedVolume))) {
        setVolume(parseFloat(savedVolume));
      }
      const savedRepeat = localStorage.getItem("playerRepeat");
      if (savedRepeat !== null) {
        setRepeat(savedRepeat === "true");
      }
      const savedShuffle = localStorage.getItem("playerShuffle");
      if (savedShuffle !== null) {
        setShuffle(savedShuffle === "true");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSetVolume = (val) => {
    const numVal = parseFloat(val);
    setVolume(numVal);
    try {
      localStorage.setItem("playerVolume", String(numVal));
    } catch (e) {
      // ignore
    }
  };

  const handleSetRepeat = (valOrFn) => {
    setRepeat((prev) => {
      const nextVal = typeof valOrFn === "function" ? valOrFn(prev) : valOrFn;
      try {
        localStorage.setItem("playerRepeat", String(nextVal));
      } catch (e) {
        // ignore
      }
      return nextVal;
    });
  };

  const handleSetShuffle = (valOrFn) => {
    setShuffle((prev) => {
      const nextVal = typeof valOrFn === "function" ? valOrFn(prev) : valOrFn;
      try {
        localStorage.setItem("playerShuffle", String(nextVal));
      } catch (e) {
        // ignore
      }
      return nextVal;
    });
  };

  useEffect(() => {
    if (openedByClick && activeSong?.id) {
      if (autoOpenFullscreen) {
        dispatch(setFullScreen(true));
      }
      dispatch(resetOpenedByClick());
    }
  }, [openedByClick, activeSong?.id, autoOpenFullscreen, dispatch]);

  useEffect(() => {
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const res = await getFavourite();
        // console.log("favourites",res);
        if (res) {
          setFavouriteSongs(res);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchFavourites();
    // set ambient background
    const src = activeSong?.image?.[1]?.url;

    if (src) {
      getPixels(src, (err, pixels) => {
        if (!err) {
          const data = [...pixels.data];
          const width = Math.round(Math.sqrt(data.length / 4));
          const height = width;

          extractColors({ data, width, height })
            .then((colors) => {
              setBgColor(colors[0]);
            })
            .catch(console.log);
        }
      });
    }
    // change page title to song name
    if (activeSong?.name) {
      document.title = activeSong?.name;
    }
  }, [activeSong]);

  // off scroll when full screen
  useEffect(() => {
    document.documentElement.style.overflow = fullScreen ? "hidden" : "auto";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [fullScreen]);

  // Hotkey for play pause
  const handleKeyPress = (event) => {
    // Check if the pressed key is the spacebar (keyCode 32 or key " ")
    if (!isTyping && (event.keyCode === 32 || event.key === " ")) {
      event.preventDefault();
      if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
      handlePlayPause();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handlePlayPause = (e) => {
    e?.stopPropagation();
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = (e) => {
    e?.stopPropagation();
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = (e) => {
    e?.stopPropagation();
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleAddToFavourite = async (favsong) => {
    if (status === "unauthenticated") {
      dispatch(setFullScreen(false));
      router.push("/login");
    }

    if (favsong?.id && status === "authenticated") {
      try {
        setLoading(true);
        // optimistic update
        if (favouriteSongs?.find((song) => song === favsong?.id)) {
          setFavouriteSongs(
            favouriteSongs?.filter((song) => song !== favsong?.id),
          );
        } else {
          setFavouriteSongs([...favouriteSongs, favsong?.id]);
        }
        const res = await addFavourite(favsong);
        if (res?.success === true) {
          setFavouriteSongs(res?.data?.favourites);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("add to fav error", error);
      }
    }
  };

  return (
    <div
      className={`relative transition-all duration-100 flex flex-col hideScrollBar backdrop-blur-2xl ${
        fullScreen
          ? "h-[100dvh] w-full justify-center overflow-y-auto min-[1180px]:overflow-hidden px-4 sm:px-6 lg:px-8"
          : "w-full h-20 px-3 sm:px-6 lg:px-8 justify-center overflow-visible"
      }`}
      onClick={() => {
        if (showLyrics) {
          setShowLyrics(false);
        }
        if (!fullScreen && activeSong?.id) {
          dispatch(setFullScreen(true));
        } else if (fullScreen) {
          dispatch(setFullScreen(false));
        }
      }}
      style={{
        backgroundColor: bgColor
          ? `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.2)`
          : "rgba(0,0,0,0.2)",
      }}
    >
      {/* Fullscreen Close Button */}
      {fullScreen && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.blur();
            dispatch(setFullScreen(false));
          }}
          className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-md outline-none focus:outline-none focus:ring-0"
          title="Close Fullscreen"
        >
          <HiOutlineChevronDown className="text-2xl sm:text-3xl" />
        </button>
      )}

      {/* Fullscreen Main Content */}
      {fullScreen && (
        <div className="flex-1 min-h-0 w-full h-full flex items-center justify-center">
          <FullscreenTrack
            handleNextSong={handleNextSong}
            handlePrevSong={handlePrevSong}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={handleSetRepeat}
            shuffle={shuffle}
            setShuffle={handleSetShuffle}
            currentSongs={currentSongs}
            activeSong={activeSong}
            fullScreen={fullScreen}
            handleAddToFavourite={handleAddToFavourite}
            favouriteSongs={favouriteSongs}
            loading={loading}
            appTime={appTime}
            duration={duration}
            setSeekTime={setSeekTime}
            volume={volume}
            setVolume={handleSetVolume}
            bgColor={bgColor}
          />
        </div>
      )}

      {/* Mini Player Row (only rendered when !fullScreen) */}
      {!fullScreen && (
        <div className="relative w-full h-full flex items-center justify-between">
          {/* Top 2px Progress Bar on Mini Player */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 sm:hidden overflow-hidden">
            <div
              className="h-full bg-[#00e6e6] transition-all duration-150"
              style={{
                width: `${
                  duration
                    ? Math.min(100, Math.max(0, (appTime / duration) * 100))
                    : 0
                }%`,
              }}
            />
          </div>

          {/* Left: Track (album art + title + artist) */}
          <div className="flex-1 min-w-0 sm:basis-0 flex items-center justify-start">
            <Track
              isPlaying={isPlaying}
              isActive={isActive}
              activeSong={activeSong}
              fullScreen={false}
            />
          </div>

          {/* Center: Desktop/Tablet Controls & Seekbar */}
          <div className="hidden sm:flex flex-initial w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex-col items-center justify-center px-2 sm:px-4">
            <Controls
              isPlaying={isPlaying}
              isActive={isActive}
              repeat={repeat}
              setRepeat={handleSetRepeat}
              shuffle={shuffle}
              setShuffle={handleSetShuffle}
              currentSongs={currentSongs}
              activeSong={activeSong}
              fullScreen={false}
              handlePlayPause={handlePlayPause}
              handlePrevSong={handlePrevSong}
              handleNextSong={handleNextSong}
              handleAddToFavourite={handleAddToFavourite}
              favouriteSongs={favouriteSongs}
              loading={loading}
            />
            <Seekbar
              value={appTime}
              min="0"
              max={duration}
              fullScreen={false}
              onInput={(event) => setSeekTime(event.target.value)}
              setSeekTime={setSeekTime}
              appTime={appTime}
            />
          </div>

          {/* Right: Desktop/Tablet VolumeBar */}
          <div className="hidden sm:flex flex-1 basis-0 min-w-0 items-center justify-end">
            <VolumeBar
              activeSong={activeSong}
              bgColor={bgColor}
              fullScreen={false}
              value={volume}
              min="0"
              max="1"
              onChange={(event) => handleSetVolume(event.target.value)}
              setVolume={handleSetVolume}
              appTime={appTime}
              setSeekTime={setSeekTime}
              showLyrics={showLyrics}
              setShowLyrics={setShowLyrics}
            />
          </div>

          {/* Mobile Compact Controls (visible only on mobile screens < sm) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex sm:hidden items-center gap-1.5 flex-shrink-0 pl-2"
          >
            <FavouriteButton
              favouriteSongs={favouriteSongs}
              activeSong={activeSong}
              loading={loading}
              handleAddToFavourite={handleAddToFavourite}
              size={22}
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                e.currentTarget.blur();
                handlePrevSong(e);
              }}
              className="p-1 text-white/90 hover:text-[#00e6e6] transition-colors"
              title="Previous"
            >
              <MdSkipPrevious size={26} />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                e.currentTarget.blur();
                handlePlayPause(e);
              }}
              className="p-1 text-[#00e6e6] hover:scale-110 active:scale-95 transition-transform"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <BsFillPauseFill size={34} />
              ) : (
                <BsFillPlayFill size={34} />
              )}
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                e.currentTarget.blur();
                handleNextSong(e);
              }}
              className="p-1 text-white/90 hover:text-[#00e6e6] transition-colors"
              title="Next"
            >
              <MdSkipNext size={26} />
            </button>
          </div>
        </div>
      )}

      {/* Player (audio element) kept always mounted */}
      <Player
        activeSong={activeSong}
        volume={volume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        repeat={repeat}
        currentIndex={currentIndex}
        onEnded={handleNextSong}
        handlePlayPause={handlePlayPause}
        handleNextSong={handleNextSong}
        handlePrevSong={handlePrevSong}
        onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
        onLoadedData={(event) => setDuration(event.target.duration)}
        appTime={appTime}
        setSeekTime={setSeekTime}
      />
    </div>
  );
};

export default MusicPlayer;
