import React from 'react'

const SongCardSkeleton = () => {
  return (
    <div className=' flex gap-3 lg:gap-6 overflow-hidden'>{
    Array(6).fill().map((_, i) => (
    <div key={i} className="flex flex-col lg:w-[205px] p-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div role="status" className="animate-pulse">
      <div className="flex items-center justify-center h-24  md:h-[180px] rounded-lg dark:bg-gray-800">
       
      </div>
      <div className="w-full mt-3">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-800 w-16 mb-2"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-800 w-28"></div>
      </div>
    </div>
  </div>
    ))
    }</div>
  )
}

export default SongCardSkeleton