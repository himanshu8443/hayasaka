"use client";
import { homePageData } from "@/services/dataAPI";
import React, { use, useRef } from "react";
import { useEffect, useState } from "react";
import {SwiperSlide } from "swiper/react";
import SongCard from "./SongCard";
import { useDispatch, useSelector } from "react-redux";
import SwiperLayout from "./Homepage/Swiper";
import { setLanguages } from "@/redux/features/languagesSlice";


const Home = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { activeSong, isPlaying,  } = useSelector((state) => state.player);
  const {languages} = useSelector((state) => state.languages);

  useEffect(() => {
    const lang = localStorage?.getItem("languages") ? JSON.parse(localStorage.getItem("languages")) : ['english'];
    setInterval(() => {
      dispatch(setLanguages(lang));
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await homePageData(languages);
      setData(res);
      console.log("home res", res);
      setLoading(false);
    };
    fetchData();
  }, [languages]);

  return (
    <div>
{/* New Releases */}
        <SwiperLayout title={"New Releases"}>
        {data?.albums?.map(
            (song) =>
                (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
                </SwiperSlide>
              )
          )}
          </SwiperLayout>

{/* trending */}
         <SwiperLayout title={"Trending"} >
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
          </SwiperLayout>   


{/* top charts */}  
        <SwiperLayout title={"Top Charts"}>
        {
            data?.charts?.map(
              (song) =>
              (
              <SwiperSlide key={song?.id}>
                <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
              </SwiperSlide>
            )
            )
          }
          </SwiperLayout>



{/* featured playlists */}
        <SwiperLayout title={"Featured Playlists"}>
        {
            data?.playlists?.map(
              (song) =>
              (
                <SwiperSlide key={song?.id}>
              <SongCard key={song?.id} song={song} activeSong={activeSong} isPlaying={isPlaying} />
              </SwiperSlide>
            )
            )
          }
          </SwiperLayout>
    </div>
  );
};

export default Home;