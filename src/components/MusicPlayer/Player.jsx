"use client";
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
  setSeekTime,
  appTime,
}) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  const artistName = Array.isArray(activeSong?.artists?.primary)
    ? activeSong.artists.primary.map((a) => a?.name).join(", ")
    : typeof activeSong?.artists === "string"
    ? activeSong.artists
    : activeSong?.primaryArtists || "Artist";

  // media session metadata:
  const mediaMetaData = activeSong?.name
    ? {
        title: activeSong?.name,
        artist: artistName,
        album: activeSong?.album?.name || "",
        artwork: [
          {
            src:
              activeSong?.image?.[2]?.url ||
              activeSong?.image?.[1]?.url ||
              activeSong?.image?.[0]?.url ||
              "",
            sizes: "500x500",
            type: "image/jpg",
          },
        ],
      }
    : {};
  useEffect(() => {
    // Check if the Media Session API is available in the browser environment
    if ("mediaSession" in navigator && activeSong?.name) {
      // Set media metadata
      navigator.mediaSession.metadata = new window.MediaMetadata(mediaMetaData);

      // Define media session event handlers
      navigator.mediaSession.setActionHandler("play", onPlay);
      navigator.mediaSession.setActionHandler("pause", onPause);
      navigator.mediaSession.setActionHandler("previoustrack", onPreviousTrack);
      navigator.mediaSession.setActionHandler("nexttrack", onNextTrack);
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        setSeekTime(appTime - 5);
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        setSeekTime(appTime + 5);
      });
    }
  }, [mediaMetaData]);
  // media session handlers:
  const onPlay = () => {
    handlePlayPause();
  };

  const onPause = () => {
    handlePlayPause();
  };

  const onPreviousTrack = () => {
    handlePrevSong();
  };

  const onNextTrack = () => {
    handleNextSong();
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <>
      <audio
        src={activeSong?.downloadUrl?.[4]?.url || activeSong?.downloadUrl?.[3]?.url || activeSong?.downloadUrl?.[2]?.url || ""}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
      />
    </>
  );
};

export default Player;
