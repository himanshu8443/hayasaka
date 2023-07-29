'use client';
import SongsList from '@/components/SongsList';
import React, { useEffect } from 'react'
import { useState } from 'react';

const page = () => {
    const [favouriteSongs, setFavouriteSongs] = useState([]);
    useEffect(() => {
        const StoredSong = localStorage?.getItem("favouriteSongs");
        const parsedSong = StoredSong ? JSON.parse(StoredSong) : [];
        setFavouriteSongs(parsedSong);
    }, []);
  return (
    <div className='mx-auto relative flex flex-col w-11/12 text-white '>
        <h1 className='text-6xl font-semibold mt-10'>Favourites</h1>
        <h2 className='text-3xl font-semibold mt-10'>Songs</h2>
        {
            <SongsList SongData={favouriteSongs} />
        }
    </div>
  )
}

export default page