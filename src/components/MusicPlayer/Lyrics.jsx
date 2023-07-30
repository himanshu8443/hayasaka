'use client';
import { getlyricsData } from '@/services/dataAPI'
import { useState} from 'react'
import React, { useEffect } from 'react'


const Lyrics = ({activeSong}) => {
    const [lyrics, setLyrics] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getlyricsData(activeSong?.id);
            setLyrics(res);
            setLoading(false);
        };
        fetchData();
    }, [activeSong?.id]);

    if (loading) {
        return (
            <>
            <h3 className=' text-white text-4xl m-3 mt-20 sm:mt-0 '>Lyrics</h3>
            <div className='w-full h-full flex justify-center items-center'>
            <div className="custom-loader"></div>
            </div>
            </>
        )
    }
  return (
    <div onClick={(e)=>{e.stopPropagation();}} >
         <h3 className=' text-white text-4xl m-3 mt-20 sm:mt-0 '>Lyrics</h3>
                    {
                        lyrics?.status==='SUCCESS' ? (  
                            <div className="text-white text-sm sm:text-base  p-5 sm:p-0 mt-10 md:w-[500px] md:h-[500px] overflow-scroll hideScrollBar">
                                {lyrics?.data?.lyrics}
                                </div>
                        ) : (
                            <div className="text-white text-lg mt-10 mx-4">
                                No Lyrics Found
                                </div>
                        )
                    }
    </div>
  )
}

export default Lyrics