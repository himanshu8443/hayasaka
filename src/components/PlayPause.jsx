import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay, loading }) => (
  loading ? (
    <div className="custom-loader"></div>
  ) :
  isPlaying && activeSong?.name === song.name ? (
  <FaPauseCircle
    size={35}
    className="text-gray-300 hover:scale-125 transform transition-all duration-300 ease-in-out"
    onClick={handlePause}
  />
) : (
  <FaPlayCircle
    size={35}
    className="text-gray-300 hover:scale-125 transform transition-all duration-300 ease-in-out"
    onClick={handlePlay}
  />
));

export default PlayPause;
