'use client'
import React from 'react';
import Link from 'next/link';
// import { useDispatch } from 'react-redux';

// import PlayPause from './PlayPause';
// import { playPause, setActiveSong } from '../redux/features/playerSlice';

const AlbumCard = ({album}) => {
  console.log("album",album);
  // const dispatch = useDispatch();

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };

  // const handlePlayClick = () => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };

  return (
    <div key={album?.id} className="flex flex-col w-[205px] p-3 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-44 group">
        {/* <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.name === album.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div> */}
        <img alt="song_img" src={album.image?.[2]?.link} className="w-full h-full rounded-lg" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-base text-white truncate">
            {album?.name}
        </p>
        <p className="text-xs truncate text-gray-300 mt-1">
            {album?.artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;
