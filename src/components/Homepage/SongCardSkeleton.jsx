import React from 'react'

const SongCardSkeleton = () => {
  return (
    <div className=' flex gap-3 lg:gap-6 overflow-hidden'>{
    Array(6).fill().map((_, i) => (
    <div className="flex flex-col lg:w-[205px] p-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div role="status" className="animate-pulse">
      <div className="flex items-center justify-center h-24  md:h-[180px] bg-gray-300 rounded-lg dark:bg-gray-800">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
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