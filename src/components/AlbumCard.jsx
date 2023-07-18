'use client'
import React from 'react';
import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';

// import PlayPause from './PlayPause';
// import { playPause, setActiveSong } from '../redux/features/playerSlice';

const AlbumCard = ({album}) => {
  // const dispatch = useDispatch();

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };

  // const handlePlayClick = () => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };

  return (
    <div key={album?.id} className="flex flex-col w-[205px] p-3 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg">
      <Link href={`/album/${album?.id}`} >
      <div className="relative w-full h-44 group">
        <div className={`absolute inset-0 justify-center items-center group-hover:flex hidden `}>
        <FaPlayCircle
    size={35}
    className="text-gray-300"/>
        </div>
        <img alt="song_img" src={album.image?.[2]?.link} className="w-full h-full rounded-lg" />
      </div>
      <div className="mt-4 flex flex-col cursor-pointer">
        <p className="font-semibold text-base text-white truncate">
            {album?.name}
        </p>
        <p className="text-xs truncate text-gray-300 mt-1">
            {album?.artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>
      </Link>
    </div>
  );
};

export default AlbumCard;
