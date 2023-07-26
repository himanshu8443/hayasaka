'use client'
import SwiperLayout from '@/components/Homepage/Swiper';
import SongCard from '@/components/SongCard';
import SongList from '@/components/SongsList';
import { setProgress } from '@/redux/features/loadingBarSlice';
import { getArtistAlbums, getArtistData, getArtistSongs } from '@/services/dataAPI';
import Image from 'next/image';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const page = ({ params }) => {
    const dispatch = useDispatch();
    const [artistDetails, setArtistDetails] = useState({});
    const [artistSongs, setArtistSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [artistAlbums, setArtistAlbums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setProgress(30));
            const details = await getArtistData(params.artistId);
            console.log('details', details);
            dispatch(setProgress(60));
            setArtistDetails(details);
            const songs = await getArtistSongs(params.artistId, 1);
            dispatch(setProgress(90));
            setArtistSongs(songs);
            const albums = await getArtistAlbums(params.artistId, 1);
            dispatch(setProgress(100));
            setArtistAlbums(albums);
            setLoading(false);
        };
        fetchData();
    }, []);


    return (
        <div className='w-11/12 m-auto'>
            <div className=" mt-16 flex flex-col lg:flex-row ">
                <div className=' relative'>
                    <Image src={artistDetails?.image?.[2]?.link} width={300} height={300} alt={artistDetails?.name} className="lg:w-[400px] lg:h-[400px]" />
                    <div className="absolute lg:w-[400px] w-[300px] inset-0 bg-gradient-to-t from-black via-transparent"></div>
                </div>
                <div className=" lg:ml-10 text-gray-100 mt-12 flex flex-col gap-y-2">
                    <h1 className="text-2xl lg:text-4xl font-bold">{artistDetails?.name}</h1>
                    <div className='flex gap-2 capitalize ml-2'>
                        <h2 className="lg:text-xl font-semibold">{artistDetails?.dominantType}</h2>
                        <p className="lg:text-xl font-semibold">|</p>
                        <h4 className="lg:text-xl font-semibold">{artistDetails?.dominantLanguage}</h4>
                    </div>
                    <ul className="flex items-center gap-3 text-gray-300">
                        <li className=" text-sm lg:text-lg font-semibold">• {artistDetails?.fanCount} listners</li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 text-gray-200">
                <h1 className="text-3xl font-bold">Songs</h1>
                <div>
                    <SongList SongData={artistSongs?.results} />
                </div>
            </div>

            <div className="mt-10 text-gray-200">
                <SwiperLayout title={"Albums"}>
                    {
                        artistAlbums?.results?.map((album, index) => (
                            <SwiperSlide key={index}>
                                <SongCard song={album} />
                            </SwiperSlide>

                        ))
                    }
                </SwiperLayout>


            </div>

        </div>
    )
}

export default page