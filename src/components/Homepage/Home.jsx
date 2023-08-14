"use client";
import { homePageData } from "@/services/dataAPI";
import React from "react";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import SongCard from "./SongCard";
import { useDispatch, useSelector } from "react-redux";
import SwiperLayout from "./Swiper";
import { setLanguages } from "@/redux/features/languagesSlice";
import { setProgress } from "@/redux/features/loadingBarSlice";
import SongCardSkeleton from "./SongCardSkeleton";
import ListenAgainCard from "../ListenAgainCard";
import { GiMusicalNotes } from 'react-icons/gi'
import { RiWifiOffLine } from 'react-icons/ri'
import { setAutoAdd } from "@/redux/features/playerSlice";
import SongBar from "./SongBar";


const Home = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { activeSong, isPlaying, } = useSelector((state) => state.player);
  const { languages } = useSelector((state) => state.languages);
  const [songHistory, setSongHistory] = useState([]);
  const [onLineStatus, setOnLineStatus] = useState(true);

  // salutation
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let salutation = '';
  if (currentHour >= 5 && currentHour < 12) {
    salutation = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    salutation = 'Good afternoon';
  } else {
    salutation = 'Good evening';
  }

  useEffect(() => {
    setSongHistory(localStorage?.getItem("songHistory") ? JSON.parse(localStorage.getItem("songHistory")) : []);
    const lang = localStorage?.getItem("languages") ? JSON.parse(localStorage.getItem("languages")) : ['english'];
    dispatch(setAutoAdd(localStorage?.getItem("autoAdd") ? JSON.parse(localStorage.getItem("autoAdd")) : false));
    dispatch(setLanguages(lang));

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

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setProgress(70))
      const res = await homePageData(languages);
      setData(res);
      dispatch(setProgress(100))
      setLoading(false);
    };
    fetchData();
  }, [languages]);



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
    <h1 className='text-4xl font-bold mx-2 m-9 text-white flex gap-2'>"{salutation}  <GiMusicalNotes/>"</h1>
    
      {/* Listen Again */}
      {
        songHistory?.length > 0 && (
          <div>
          <h2 className=" text-white mt-4 text-2xl lg:text-3xl font-semibold mb-4 ">Listen Again</h2>
          <div className=" grid grid-cols-2 lg:grid-cols-3 gap-x-10">
          {
          songHistory?.map((song,index) => (
            <ListenAgainCard key={song?.id} song={song} SongData={songHistory} index={index} />
          ))
          }
          </div>
          </div>
        )
      }

    {/* trending */}
    <SwiperLayout title={"Trending"} >
      {
         loading ? (
          <SongCardSkeleton />
     ) : (
      <>
      {data?.trending?.songs?.map(
        (song) =>
        (
          <SwiperSlide key={song?.id}>
            <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
          </SwiperSlide>
        )
      )}

      {data?.trending?.albums?.map(
        (song) =>
        (
          <SwiperSlide key={song?.id}>
            <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
          </SwiperSlide>
        )
      )}
      </>
     )
      }
    </SwiperLayout>

       {/* top charts */}
       <div className="my-4 lg:mt-14">
      <h2 className=" text-white mt-4 text-2xl lg:text-3xl font-semibold mb-4 ">Top Charts</h2>
      <div className="grid lg:grid-cols-2 gap-x-10 max-h-96 lg:max-h-full lg:overflow-y-auto overflow-y-scroll">
        {
          loading ? (
            <div className=" w-[90vw] overflow-x-hidden">
                <SongCardSkeleton />
            </div>
           ) : (
            data?.charts?.slice(0,10)?.map(
              (playlist,index) =>
              (
                  <SongBar key={index} playlist={playlist} i={index} />
              ))
          )
        }
      </div>
      </div>

        {/* New Releases */}
      <SwiperLayout title={"New Releases"}>
        {
           loading ? (
                <SongCardSkeleton />
           ) : (
            data?.albums?.map(
          (song) =>
          (
            <SwiperSlide key={song?.id}>
              <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
            </SwiperSlide>
          )
        )
           )
        }
      </SwiperLayout>

      {/* featured playlists */}
      <SwiperLayout title={"Featured Playlists"}>
        {
        loading ? (
              <SongCardSkeleton />
         ) : (
          data?.playlists?.map(
            (song) =>
            (
              <SwiperSlide key={song?.id}>
                <SongCard key={song?.id} song={song} activeSong={activeSong} isPlaying={isPlaying} />
              </SwiperSlide>
            )
          )
         )
        }
      </SwiperLayout>

    </div>
  );
};

export default Home;