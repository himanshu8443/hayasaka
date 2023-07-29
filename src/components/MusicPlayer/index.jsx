'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, playPause, setFullScreen } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import FullscreenTrack from './FullscreenTrack';
import Lyrics from './Lyrics';
import Downloader from './Downloader';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, fullScreen } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]);

  useEffect(() => {
    setFavouriteSongs(localStorage?.getItem("favouriteSongs") ? JSON.parse(localStorage.getItem("favouriteSongs")) : []);
  }, []);

  useEffect(() => {
    document.body.style.overflow = fullScreen ? 'hidden' : 'auto';
  }, [fullScreen]);

// Hotkey for play pause
  const handleKeyPress = (event) => {
    // Check if the pressed key is the spacebar (keyCode 32 or key " ")
    if (event.keyCode === 32 || event.key === " ") {
      event.preventDefault();
      handlePlayPause();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
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

  const handleAddToFavourite = (favsong) => {
    if(favsong?.id){
     const StoredSong = localStorage?.getItem("favouriteSongs");
      const parsedSong = StoredSong ? JSON.parse(StoredSong) : [];
      if(!parsedSong?.find((song) => song?.id === favsong?.id)){
        const updatedFavs = [favsong,...parsedSong];
        setFavouriteSongs(updatedFavs);
        localStorage.setItem("favouriteSongs", JSON.stringify(updatedFavs));
        }else{
          const filteredSongs = parsedSong.filter((song) => song?.id !== favsong?.id);
          const updatedFavs = [...filteredSongs];
          setFavouriteSongs(updatedFavs);
          localStorage.setItem("favouriteSongs", JSON.stringify(updatedFavs));
        }
      }
  };
 


  return (
    <div className={`relative overflow-scroll hideScrollBar sm:px-12  flex flex-col transition-all duration-100 ${fullScreen ? 'h-[100vh] w-[100vw]':'w-full h-20 px-8 '}`}
    onClick={() => {
      if(activeSong?.id){
      dispatch(setFullScreen(!fullScreen));
      }
    }}
    >
      <HiOutlineChevronDown onClick={
        (e)=>{
          e.stopPropagation();
          dispatch(setFullScreen(!fullScreen));
        }
      } className={` absolute top-16 md:top-10 right-7 text-white text-3xl cursor-pointer ${fullScreen ? '':'hidden'}`}/>
      <FullscreenTrack appTime={appTime} setSeekTime={setSeekTime} duration={duration}  activeSong={activeSong} fullScreen={fullScreen} />
      <div className=' flex items-center justify-between pt-2'>
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} fullScreen={fullScreen} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className={`${fullScreen ? '':'hidden'}  sm:hidden flex items-center justify-center gap-4`}>
        { favouriteSongs?.find((song) => song?.id === activeSong?.id) ?
       <AiFillHeart onClick={(e)=>{
          e.stopPropagation();
         handleAddToFavourite(activeSong)}} title='Favourite' size={25} color={'#00e6e6'} className={` mb-3 cursor-pointer`} />
      :
      <AiOutlineHeart onClick={(e)=>{
        e.stopPropagation();
        handleAddToFavourite(activeSong)}} title='Favourite' size={25} color={'white'} className={` mb-3 cursor-pointer`} />
        }
        <div className={`mb-3 sm:hidden flex items-center justify-center`}>
          <Downloader activeSong={activeSong} fullScreen={fullScreen} />
        </div>
        </div>
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
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          fullScreen={fullScreen}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
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
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
    {
      fullScreen &&
      <div className=' sm:hidden'>
       <Lyrics activeSong={activeSong}/>
      </div>
    }
    </div>
  );
};

export default MusicPlayer;
