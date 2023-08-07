'use client';
import { getlyricsData } from '@/services/dataAPI'
import { useState} from 'react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SongsList from '../SongsList';


const Lyrics = ({activeSong}) => {
    const {currentSongs} = useSelector(state => state.player);
    const [lyrics, setLyrics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('lyrics');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getlyricsData(activeSong?.id);
            setLyrics(res);
            setLoading(false);
        };
        fetchData();
    }, [activeSong?.id]);

    // if (loading) {
    //     return (
    //         <>
    //         <h3 className=' text-white text-4xl m-3 mt-20 sm:mt-0 '>Lyrics</h3>
    //         <div className='w-full h-full flex justify-center items-center'>
    //         <div className="custom-loader"></div>
    //         </div>
    //         </>
    //     )
    // }
  return (
    <div onClick={(e)=>{e.stopPropagation();}} >
        <div className='flex justify-center items-center w-full'>
            <button onClick={()=>{setActiveTab('queue')}} className={`${activeTab ==='queue' ? 'border-[#00e6e6] border-b-2':'' } text-white text-xl m-3 mt-20 sm:mt-0 font-medium `}>Queue</button>
            <button onClick={()=>{setActiveTab('lyrics')}} className={`${activeTab ==='lyrics' ? 'border-[#00e6e6] border-b-2':'' } text-white text-xl m-3 mt-20 sm:mt-0  font-medium`}>Lyrics</button>
        </div>
        <div>
                    { activeTab === 'lyrics' ? (
                        lyrics?.status==='SUCCESS' ? (  
                            <div className="text-white text-sm sm:text-base p-4 sm:p-0 mt-5 md:w-[450px] md:h-[500px] overflow-y-scroll hideScrollBar">
                                {lyrics?.data?.lyrics}
                                </div>
                        ) : (
                            <div className="text-white text-lg mt-10 mx-4">
                                No Lyrics Found
                                </div>
                        )) : (
                            <div className=" text-white p-4 mt-5 md:w-[450px] h-[70vh] overflow-y-scroll hideScrollBar ">
                                <SongsList SongData={currentSongs} loading={false} hidePlays={true} activeSong={activeSong} />
                            </div>
                        )
                    }
        </div>
    </div>
  )
}

export default Lyrics