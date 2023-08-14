import React from 'react';
import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';
import { usePalette } from 'react-palette';

const SongBar = ({playlist,i}) => {
  const { data, loading, error } = usePalette(playlist.image?.[1]?.link);

  return (<Link href={`/playlist/${playlist?.id}`}>
  <div className={`w-full flex flex-row items-center group bg-opacity-20 py-2 p-4 rounded-lg cursor-pointer mb-2 `} style={
    {
      background: `linear-gradient(90deg, rgba(${parseInt(data?.vibrant?.slice(1, 3), 16)}, ${parseInt(data?.vibrant?.slice(3, 5), 16)}, ${parseInt(data?.vibrant?.slice(5, 7), 16)}, 0.2) 0%, rgba(${parseInt(data?.darkVibrant?.slice(1, 3), 16)}, ${parseInt(data?.darkVibrant?.slice(3, 5), 16)}, ${parseInt(data?.darkVibrant?.slice(5, 7), 16)}, 0.2) 100%)`,
      boxShadow: `0px 0px 10px 0px rgba(${parseInt(data?.darkVibrant?.slice(1, 3), 16)}, ${parseInt(data?.darkVibrant?.slice(3, 5), 16)}, ${parseInt(data?.darkVibrant?.slice(5, 7), 16)}, 0.1)`,
    }
  }>
    <h3 className=" text-base text-white mr-3 font-extrabold">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
    <img width={80} height={80} loading='lazy' alt="song_img"
          srcSet={`${playlist.image?.[0]?.link} 320w, ${playlist.image?.[1]?.link} 480w, ${playlist.image?.[2]?.link} 800w`}
          sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
          src={playlist.image?.[1]?.link}
          className=' w-20 h-20 rounded-lg'
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
            <p className="font-semibold text-base w-40 lg:text-xl text-white truncate md:w-full">
              {playlist?.title}
            </p>
        <p className="md:text-base text-sm text-gray-300 mt-1 capitalize">
          {playlist?.language}
        </p>
      </div>
    </div>
    <FaPlayCircle
    size={35}
    className="text-gray-300 group-hover:scale-125 transform transition-all duration-300 ease-in-out"
  />
  </div>
  </Link>
  );
};

export default SongBar;