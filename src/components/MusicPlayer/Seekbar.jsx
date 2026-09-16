import React from "react";
import { GiFastBackwardButton, GiFastForwardButton } from "react-icons/gi";

const Seekbar = ({
  value,
  min,
  max,
  onInput,
  setSeekTime,
  appTime,
  fullScreen,
}) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div
      className={`${
        !fullScreen
          ? "hidden sm:flex w-full max-w-[700px] lg:max-w-[850px] xl:max-w-[1050px] 2xl:max-w-[1250px] flex-row items-center justify-center px-4"
          : "flex w-full max-w-[620px] xl:max-w-[720px] 2xl:max-w-[820px] mt-4 flex-row items-center justify-between"
      }`}
    >
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.stopPropagation();
          e.currentTarget.blur();
          setSeekTime(appTime - 5);
        }}
        className={`${
          !fullScreen ? "hidden lg:block lg:mr-3" : "hidden sm:flex mr-2"
        } text-white hover:text-[#00e6e6] transition-colors flex-shrink-0 outline-none focus:outline-none focus:ring-0`}
      >
        <GiFastBackwardButton
          size={fullScreen ? 24 : 20}
          className="text-gray-300 hover:text-[#00e6e6]"
        />
      </button>
      <p
        className={`text-white ${
          fullScreen ? "text-xs sm:text-base w-9 sm:w-11" : "text-xs sm:text-sm w-9 sm:w-10"
        } text-center font-medium select-none flex-shrink-0`}
      >
        {value === 0 ? "0:00" : getTime(value)}
      </p>
      <input
        onClick={(event) => {
          event.stopPropagation();
        }}
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className={`w-full flex-1 min-w-0 ${
          fullScreen ? "h-1.5 sm:h-2 mx-2 sm:mx-4" : "h-1.5 mx-2 sm:mx-4"
        } rounded-lg accent-[#00e6e6] cursor-pointer transition-all outline-none focus:outline-none focus:ring-0`}
      />
      <p
        className={`text-white ${
          fullScreen ? "text-xs sm:text-base w-9 sm:w-11" : "text-xs sm:text-sm w-9 sm:w-10"
        } text-center font-medium select-none flex-shrink-0`}
      >
        {max === 0 ? "0:00" : getTime(max)}
      </p>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.stopPropagation();
          e.currentTarget.blur();
          setSeekTime(appTime + 5);
        }}
        className={`${
          !fullScreen ? "hidden lg:block lg:ml-3" : "hidden sm:flex ml-2"
        } text-white hover:text-[#00e6e6] transition-colors flex-shrink-0 outline-none focus:outline-none focus:ring-0`}
      >
        <GiFastForwardButton
          size={fullScreen ? 24 : 20}
          className="text-gray-300 hover:text-[#00e6e6]"
        />
      </button>
    </div>
  );
};

export default Seekbar;
