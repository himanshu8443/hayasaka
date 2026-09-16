"use client";
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useMemo } from "react";

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

  const audioSource =
    activeSong?.downloadUrl?.[4]?.url ||
    activeSong?.downloadUrl?.[3]?.url ||
    activeSong?.downloadUrl?.[2]?.url ||
    "";

  useEffect(() => {
    const audio = ref.current;
    if (!audio || !audioSource) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Audio playback error:", error);
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, audioSource]);

  const artistName = useMemo(() => {
    if (Array.isArray(activeSong?.artists?.primary)) {
      return activeSong.artists.primary.map((a) => a?.name).join(", ");
    }
    if (typeof activeSong?.artists === "string") {
      return activeSong.artists;
    }
    return activeSong?.primaryArtists || "Artist";
  }, [activeSong?.artists, activeSong?.primaryArtists]);

  const mediaMetaData = useMemo(() => {
    if (!activeSong?.name) return null;
    return {
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
    };
  }, [activeSong?.name, artistName, activeSong?.album?.name, activeSong?.image]);

  useEffect(() => {
    if ("mediaSession" in navigator && mediaMetaData) {
      navigator.mediaSession.metadata = new window.MediaMetadata(mediaMetaData);

      navigator.mediaSession.setActionHandler("play", () => handlePlayPause());
      navigator.mediaSession.setActionHandler("pause", () => handlePlayPause());
      navigator.mediaSession.setActionHandler("previoustrack", () => handlePrevSong());
      navigator.mediaSession.setActionHandler("nexttrack", () => handleNextSong());
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        setSeekTime((ref.current?.currentTime || 0) - 5);
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        setSeekTime((ref.current?.currentTime || 0) + 5);
      });
    }
  }, [mediaMetaData, handlePlayPause, handlePrevSong, handleNextSong, setSeekTime]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current && typeof seekTime === "number") {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={audioSource}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
