import React from 'react';
import { GiFastBackwardButton, GiFastForwardButton } from 'react-icons/gi';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime, fullScreen }) => {
  // converts the time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className={` ${!fullScreen ? 'hidden sm:flex':' flex mt-5'}   flex-row items-center`}>
      <button type="button" onClick={(e) =>{e.stopPropagation(); setSeekTime(appTime - 5)}} className="hidden lg:mr-4 lg:block text-white">
        <GiFastBackwardButton size={20} className=' text-gray-300' />
      </button>
      <p className="text-white text-xs sm:text-base w-5">{value === 0 ? '0:00' : getTime(value)}</p>
      <input onClick={(event) => {event.stopPropagation();}}
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-[70vw] md:w-[650px] 2xl:w-[50vw] h-1 mx-4 2xl:mx-6 rounded-lg accent-[#00e6e6] cursor-pointer"
      />
      <p className="text-white text-xs sm:text-base">{max === 0 ? '0:00' : getTime(max)}</p>
      <button type="button" onClick={(e) =>{e.stopPropagation(); setSeekTime(appTime + 5)}} className="hidden lg:ml-4 lg:block text-white">
        <GiFastForwardButton size={20} className=' text-gray-300 ' />
      </button>
    </div>
  );
};

export default Seekbar;
