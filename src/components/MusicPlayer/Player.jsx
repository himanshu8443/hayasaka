import React, { useRef, useEffect,useState } from "react";

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
  playbackSpeed = 1, // Add this new prop
}) => {
  const ref = useRef(null);
  const [lyrics, setLyrics] = useState(null);
    useEffect(() => {
      const getLyricsData = async (songName) => {
        try {
          const artist = activeSong.artists.primary[0].name;
          const url = `https://api.lyrics.ovh/v1/${artist}/${songName}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Lyrics not found");
          }
          const data = await response.json();
          setLyrics(data.lyrics);
        } catch (error) {
          console.error(error.message);
        }
      };
  
      if (activeSong?.name) {
        getLyricsData(activeSong.name);
      }
    }, [activeSong]);
  
    // Speak lyrics when playing, stop when paused
    useEffect(() => {
      if (isPlaying && lyrics) {
        const utterance = new SpeechSynthesisUtterance(lyrics);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
  
        // Stop speaking when paused
        return () => window.speechSynthesis.cancel();
      } else {
        window.speechSynthesis.cancel(); // Stop any ongoing speech when paused or song changes
      }
    }, [isPlaying, lyrics]);
  // media session metadata:
  const mediaMetaData = activeSong.name
    ? {
        title: activeSong?.name,
        artist: activeSong?.primaryArtists,
        album: activeSong?.album.name,
        artwork: [
          {
            src: activeSong.image[2]?.url,
            sizes: "500x500",
            type: "image/jpg",
          },
        ],
      }
    : {};

  
  useEffect(() => {
    // Check if the Media Session API is available in the browser environment
    if ("mediaSession" in navigator) {
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

  // Handle volume changes
  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  // Handle seek time changes
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  // Handle playback speed changes
  useEffect(() => {
    if (ref.current) {
      ref.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
    <audio
      src={activeSong?.downloadUrl?.[4]?.url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
