"use client";
import SwiperLayout from "@/components/Homepage/Swiper";
import SongCard from "@/components/Homepage/SongCard";
import SongListSkeleton from "@/components/SongListSkeleton";
import SongList from "@/components/SongsList";
import { setProgress } from "@/redux/features/loadingBarSlice";
import {
  getArtistAlbums,
  getArtistData,
  getArtistSongs,
} from "@/services/dataAPI";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SwiperSlide } from "swiper/react";

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
      // console.log("details", details);
      dispatch(setProgress(60));
      setArtistDetails(details);
      const songs = await getArtistSongs(params.artistId, 1);
      dispatch(setProgress(90));
      setArtistSongs(songs);
      const albums = await getArtistAlbums(params.artistId, 1);
      setArtistAlbums(albums?.albums);
      console.log("cccc", albums.albums);
      dispatch(setProgress(100));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="w-11/12 m-auto">
      <div className=" mt-16 flex flex-col lg:flex-row ">
        {loading ? (
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex lg:w-[400px] lg:h-[400px] items-center justify-center w-[300px] h-[300px] bg-gray-300 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className=" relative">
            <Image
              src={artistDetails?.image?.[2]?.url}
              width={300}
              height={300}
              alt={artistDetails?.name}
              className="lg:w-[400px] lg:h-[400px]"
            />
            <div className="absolute lg:w-[400px] w-[300px] inset-0 bg-gradient-to-t from-black via-transparent"></div>
          </div>
        )}

        <div className=" lg:ml-10 text-gray-100 mt-12 flex flex-col gap-y-2">
          <h1 className="text-2xl lg:text-4xl font-bold">
            {artistDetails?.name}
          </h1>
          <div className="flex gap-2 capitalize ml-2">
            <h2 className="lg:text-xl font-semibold">
              {artistDetails?.dominantType}
            </h2>
            <p className="lg:text-xl font-semibold">|</p>
            <h4 className="lg:text-xl font-semibold">
              {artistDetails?.dominantLanguage}
            </h4>
          </div>
          <ul className="flex items-center gap-3 text-gray-300">
            <li className=" text-sm lg:text-lg font-semibold">
              • {artistDetails?.fanCount} listners
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-gray-200">
        <h1 className="text-3xl font-bold">Songs</h1>
        {loading ? (
          <SongListSkeleton />
        ) : (
          <div>
            <SongList SongData={artistSongs?.songs} />
          </div>
        )}
      </div>

      <div className="mt-10 text-gray-200">
        <SwiperLayout title={"Albums"}>
          {artistAlbums?.map((album, index) => (
            <SwiperSlide key={index}>
              <SongCard song={album} />
            </SwiperSlide>
          ))}
        </SwiperLayout>
      </div>
    </div>
  );
};

export default page;
