'use client';
import { playPause } from '@/redux/features/playerSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SongsHistory = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, fullScreen } = useSelector((state) => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeSong?.name) {
        const storedSongHistory = localStorage?.getItem("songHistory");
        const parsedSongHistory = storedSongHistory ? JSON.parse(storedSongHistory) : [];
        if(parsedSongHistory?.find((song) => song?.id === activeSong?.id)){
          const updatedHistory = parsedSongHistory.filter((song) => song?.id !== activeSong?.id);
          const songHistory = [activeSong, ...updatedHistory];
          localStorage.setItem("songHistory", JSON.stringify(songHistory));
        }else{
          if(parsedSongHistory?.length > 8) parsedSongHistory?.pop();
          const songHistory = [activeSong,...parsedSongHistory];
          localStorage.setItem("songHistory", JSON.stringify(songHistory));
        }
      }
      }, [activeSong]); 





  const handlePlayPause = (e) => {
    e?.stopPropagation();
    if (!isActive) return;

    // if (isPlaying) {
    //   dispatch(playPause(false));
    // } else {
    //   dispatch(playPause(true));
    // }
  };

  

  return
}

export default SongsHistory