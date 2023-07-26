import React from 'react'
import { playPause, setActiveSong } from "@/redux/features/playerSlice";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const SongsList = ({SongData}) => {
    const dispatch = useDispatch();
  const handlePlayClick = (song,index) => {
    dispatch(setActiveSong({ song, data: SongData, i: index }));
    dispatch(playPause(true));
    };

    function formatDuration(durationInSeconds) {
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.round(durationInSeconds % 60);
      
      if (minutes > 0) {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${seconds}`;
      }
    }
  return (
        <div className="mt-5">
          {
            SongData?.length > 0 && (
          SongData?.map((song,index) => (
            <div key={index}
            onClick={() => {
                handlePlayClick(song,index);
            }
            }
             className="flex items-center  mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between">
                <div className="flex items-center gap-5">
              <div className=" relative">
                <img src={song?.image?.[2]?.link} alt={song?.name} width={50} height={50} className="rounded- mb-3"
                />
                <BsPlayFill
                  size={25}
                  className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                />
              </div>
              <div className="w-32 lg:w-80">
                <p className="text-sm lg:text-lg font-semibold truncate">{
                    song?.name?.replace("&#039;", "'")?.replace("&amp;", "&")
                }</p>
              </div>
              </div>
              <div className="hidden lg:block w-36">
                {song?.playCount && (
                    <p className="text-gray-400">{song?.playCount} plays</p>
                )}
                </div>
                <div>
                <p>{formatDuration(song?.duration)}</p>
                </div>
            </div>
          )
          ))}
        </div>
  )
}

export default SongsList;