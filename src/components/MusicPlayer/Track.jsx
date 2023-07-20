import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_15s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.image?.[2].link} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[190px]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.name ? activeSong?.name.replace("&#039;", "'").replace("&amp;", "&") : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.primaryArtists ? activeSong?.primaryArtists : 'Artist'}
      </p>
    </div>
  </div>
);

export default Track;
