"use client";
import { homePageData } from "@/services/dataAPI";
import React, { use, useRef } from "react";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import SongCard from "./SongCard";
import { useDispatch, useSelector } from "react-redux";
import SwiperLayout from "./Homepage/Swiper";
import { setLanguages } from "@/redux/features/languagesSlice";
import { setProgress } from "@/redux/features/loadingBarSlice";
import SongCardSkeleton from "./Homepage/SongCardSkeleton";
import ListenAgainCard from "./ListenAgainCard";


const Home = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { activeSong, isPlaying, } = useSelector((state) => state.player);
  const { languages } = useSelector((state) => state.languages);
  const [songHistory, setSongHistory] = useState([]);

  useEffect(() => {
    setSongHistory(localStorage?.getItem("songHistory") ? JSON.parse(localStorage.getItem("songHistory")) : []);
    const lang = localStorage?.getItem("languages") ? JSON.parse(localStorage.getItem("languages")) : ['english'];
    setInterval(() => {
      dispatch(setLanguages(lang));
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // dispatch(setProgress(50))
      const res = await homePageData(languages);
      setData(res);
      // dispatch(setProgress(100))
      setLoading(false);
    };
    fetchData();
  }, [languages]);


  return (
    <div>
      {/* Listen Again */}
      {
        songHistory?.length > 0 && (
          <div>
          <h2 className=" text-white mt-4 text-lg lg:text-3xl font-semibold mb-4 ">Listen Again</h2>
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
        {}
      </SwiperLayout>

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
      <SwiperLayout title={"Top Charts"}>
        {
          loading ? (
                <SongCardSkeleton />
           ) : (
            data?.charts?.map(
              (song) =>
              (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
                </SwiperSlide>
              ))
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