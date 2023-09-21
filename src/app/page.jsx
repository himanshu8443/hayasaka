'use client'
import Homepage from '@/components/Homepage/Home'
import { useEffect, useLayoutEffect } from 'react'
import { useState } from 'react'

export default function Home() {
  const [showtip, setShowtip] = useState(false);
  const [toturialComplete, setToturialComplete] = useState(false);

  useLayoutEffect(() => {
    setToturialComplete(JSON.parse(localStorage.getItem('toturialComplete')));

    setTimeout(() => {
      if (!toturialComplete) {
        setShowtip(true);
      }
    }, 5000);
  }, [])
  useEffect(() => {

  }, [toturialComplete])

  const handleClick = () => {
    setShowtip(false);
    setToturialComplete(true);
    localStorage.setItem('toturialComplete', true);
  }
  return (
    <div>
      {showtip && !toturialComplete &&
        <div className='absolute top-4 left-16 z-50'>
          <div className=' relative bg-[#3a3b3b] p-4 rounded-lg'>
            <p className=' text-lg text-gray-300'>
              Create your own <span className='text-[#00e6e6]'>Playlists</span> <br />and
              add songs to <span className='text-[#00e6e6]'>Favourite</span>
            </p>
            <div className=' flex items-center mt-2 justify-end'>
              <button onClick={handleClick} className=' bg-[#00e6e6] text-black px-3 py-2 rounded-lg'>Ok</button>
            </div>
            <div className=' absolute top-2 -left-2 bg-[#3a3b3b] rotate-[50deg] w-6 h-6'></div>
          </div>
        </div>}
      <div className=' mx-auto relative flex flex-col w-11/12 text-white '>
        <Homepage />
      </div>
    </div>
  )
}
