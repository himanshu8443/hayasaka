'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const SongsHistory = () => {
  const { activeSong } = useSelector((state) => state.player);

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

  return
}

export default SongsHistory