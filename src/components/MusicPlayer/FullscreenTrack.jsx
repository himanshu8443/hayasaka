
import Lyrics from './Lyrics'
import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setFullScreen } from '@/redux/features/playerSlice'

const FullscreenTrack = ({ fullScreen, activeSong }) => {
  const dispatch = useDispatch();


  return (
    <div onClick={(e) => e.stopPropagation()} className={`${fullScreen ? 'block' : 'hidden'} w-[100vw] flex lg:flex-row lg:w-[900px] mx-auto flex-col  lg:justify-between mt-10`}>
      <div className="flex flex-col items-center lg:w-96">
        <div className=" h-72 w-72 lg:h-96 lg:w-96 sm:mt-28 mt-20 ">
          <img src={activeSong?.image?.[2].link} alt="cover art" />
        </div>
        <div className=" w-full select-none cursor-pointer text-center my-5">
          <p className="truncate text-white font-bold text-lg">
            {activeSong?.name ? activeSong?.name.replace("&#039;", "'").replace("&amp;", "&") : 'Song'}
          </p>
          <p className="truncate text-gray-300">
            {activeSong?.primaryArtists ? (
              activeSong?.primaryArtists?.split(",")?.map((artist, index) => (
                <React.Fragment key={index}>
                  <Link className=" hover:underline" href={`/artist/${activeSong?.primaryArtistsId?.split(",")[index]?.trim()}`} onClick={
                    () => {
                      dispatch(setFullScreen(false))
                    }
                  }>
                    {artist?.trim()}
                  </Link>
                  {index < activeSong.primaryArtists.split(",").length - 1 && ", "}
                </React.Fragment>
              ))
            ) : 'Artist'}
          </p>
        </div>
      </div>
      <div className=" ml-48  flex-col items-center sm:flex hidden">
        <Lyrics activeSong={activeSong} />
      </div>
    </div>
  )
}

export default FullscreenTrack