'use client'
import React, { memo, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { getSongData } from '@/services/dataAPI';
import Image from 'next/image';

const SongCard = ({ song, isPlaying, activeSong }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    if (song?.type === "song") {
      dispatch(playPause(false));
    }
  };

  const handlePlayClick = async () => {
    if (song?.type === "song") {
      setLoading(true);
      const Data = await getSongData(song?.id);
      const songData = await Data?.[0]
      dispatch(setActiveSong({ song: songData }));
      dispatch(playPause(true));
      setLoading(false);
    }
  };

  return (
    <div key={song?.id} className="flex flex-col lg:w-[205px] p-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <Link onClick={(e)=>{if(song?.type == 'song'){
        e.preventDefault()
      }}} href={song?.type === 'album' ? `/album/${song?.id}` : song?.type ==='playlist' ? `/playlist/${song?.id}` : ''} >
        <div className="relative w-full lg:h-[178px] group">
          <div className={`absolute inset-0 p-2 justify-center items-center bg-black bg-opacity-0 group-hover:flex ${activeSong?.id === song?.id ? 'hover:flex hover:bg-black hover:bg-opacity-70' : 'hidden'}`}>
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              loading={loading}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          <img width={200} height={200} loading='lazy' alt="song_img"
          srcset={`${song.image?.[0]?.link} 320w, ${song.image?.[1]?.link} 480w, ${song.image?.[2]?.link} 800w`}
          sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
          src={song.image?.[1]?.link}
           className={`${song.type === 'playlist' && song?.subtitle === 'JioSaavn' ? 'rounded-full' :'rounded-lg'} w-full h-full `} />
        </div>

        <div className=" mt-2 lg:mt-4 flex flex-col">
          <p className={`font-semibold text-xs lg:text-sm text-white truncate w-full ${song?.subtitle === 'JioSaavn' ? 'text-center' : ''}`}>
            {song?.name?.replace("&#039;", "'")?.replace("&amp;", "&") || song?.title}
          </p>
          <p className="text-[9px] lg:text-xs truncate text-gray-300 mt-1">
            {song?.artists?.map((artist) => artist?.name).join(', ') || song?.primaryArtists?.map((artist) => artist?.name).join(', ') || song?.artists?.map((artist) => artist.name).join(', ') || song?.subtitle != 'JioSaavn' && song?.subtitle }
          </p>
        </div>
      </Link>
    </div>
  );
};

export default memo(SongCard, (prev, next) =>(
  prev.song === next.song && prev.activeSong === next.activeSong && prev.isPlaying === next.isPlaying
));
