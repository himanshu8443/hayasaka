import React from 'react'

const SongListSkeleton = () => {
  return (
    Array(7).fill().map((_,index) =>(
        <div key={index} className=' animate-pulse flex items-center  mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between'>
              <div className="flex items-center gap-5">
              <div className=" bg-gray-300 dark:bg-gray-700 mb-3 w-[50px] h-[50px]">
                </div>
                <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-16 lg:w-32 h-5"></div>
                </div>
                <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-16 lg:w-16 h-7"></div>
        </div>
        ))
  )
}

export default SongListSkeleton