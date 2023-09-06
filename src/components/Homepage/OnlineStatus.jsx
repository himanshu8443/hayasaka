'use client'
import { RiWifiOffLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'




const OnlineStatus = () => {
    const [onLineStatus, setOnLineStatus] = useState(true);
    useEffect(() => {
        const checkOnline = () => {
          if (!navigator.onLine) {
            setOnLineStatus(false);
          }
          else {
            setOnLineStatus(true);
          }
        }
        checkOnline();
      }, []);
  return (
    <div>
          {
        !onLineStatus && (
          <div className="bg-red-500 flex text-white text-center p-2 bg-richblack-300 justify-center gap-2 items-center">
          <RiWifiOffLine size={22}/>Please check your internet connection.
          <button className="ml-2 bg-richblack-500 rounded-md p-1 px-2 bg-black bg-opacity-20 hover:bg-opacity-40 font-medium text-white" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
        )
      }
    </div>
  )
}

export default OnlineStatus