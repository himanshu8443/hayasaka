"use client";
import { homePageData } from "@/services/dataAPI";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  FreeMode,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import SongCard from "./SongCard";
import { useSelector } from "react-redux";



const Home = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  const albumNext = useRef(null);
  const ablumPrv = useRef(null);

  const { activeSong, isPlaying,  } = useSelector((state) => state.player);




  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await homePageData(["english,punjabi"]);
      setData(res);
      console.log("home res", res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
{/* New Releases */}
      <div className=" m-4">
        <h2 className=" text-white mt-4 text-4xl font-semibold">New Release</h2>

        
{/* Album slider */}
        <div>
        <div className=" flex justify-between">
        <h3 className=" m-4 text-3xl text-gray-300 font-semibold">Albums</h3>
        <div className=" flex gap-1">
          <div ref={ablumPrv} className=" m-4 border border-white rounded-full cursor-pointer">
        <MdNavigateBefore size={35}  className="text-white text-xl" />
        </div>
        <div ref={albumNext} className=" m-4 border border-white rounded-full cursor-pointer">
        <MdNavigateNext size={35}  className="text-white text-xl" />
        </div>
        </div>
        </div>
        <Swiper
          modules={[Pagination, Navigation, FreeMode, Mousewheel, Keyboard]}
          style={{
            "--swiper-navigation-size": "20px",
            "--swiper-navigation-color": "white",
          }}
          spaceBetween={5}
          // slidesPerView={8.3}
          breakpoints={{
            300:{slidesPerView:3.1,spaceBetween:10,},
            640:{slidesPerView:4.2,spaceBetween:10,},
            1024:{slidesPerView:6.3,spaceBetween:10,},
        }}
          mousewheel={{
            enabled: true,
            forceToAxis: true,
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          freeMode={true}
          navigation={
            {
               nextEl: albumNext.current,
              prevEl: ablumPrv.current,
          }
          }
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = ablumPrv.current;
            swiper.params.navigation.nextEl = albumNext.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="mySwiper"
        >            
          {data?.albums?.map(
            (album) =>
              album?.type === "album" && (
                <SwiperSlide key={album?.id}>
                  <AlbumCard album={album} />
                </SwiperSlide>
              )
          )}
        </Swiper>
        </div>

{/* Song slider */}
<div>
        <div className=" flex justify-between">
        <h3 className=" mt-10 m-4 text-3xl text-gray-300 font-semibold">Songs</h3>
        <div className=" flex gap-1">
          <div ref={ablumPrv} className=" m-4 mt-10 border border-white rounded-full cursor-pointer">
        <MdNavigateBefore size={35}  className="text-white text-xl" />
        </div>
        <div ref={albumNext} className=" m-4 mt-10 border border-white rounded-full cursor-pointer">
        <MdNavigateNext size={35}  className="text-white text-xl" />
        </div>
        </div>
        </div>
        <Swiper
          modules={[Pagination, Navigation, FreeMode, Mousewheel, Keyboard]}
          style={{
            "--swiper-navigation-size": "20px",
            "--swiper-navigation-color": "white",
          }}
          spaceBetween={5}
          // slidesPerView={8.3}
          breakpoints={{
            300:{slidesPerView:3.1,spaceBetween:10,},
            640:{slidesPerView:4.2,spaceBetween:10,},
            1024:{slidesPerView:6.3,spaceBetween:10,},
        }}
          mousewheel={{
            enabled: true,
            forceToAxis: true,
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          freeMode={true}
          navigation={
            {
               nextEl: albumNext.current,
              prevEl: ablumPrv.current,
          }
          }
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = ablumPrv.current;
            swiper.params.navigation.nextEl = albumNext.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="mySwiper"
        >            
          {data?.albums?.map(
            (song,index) =>
            song?.type === "song" && (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} i={index} data={data?.albums} />
                </SwiperSlide>
              )
          )}
        </Swiper>
        </div>
      </div>

{/* trending */}
      <div className=" m-4 mt-20">
         <div className=" flex justify-between">
        <h2 className=" text-white mt-4 text-4xl font-semibold mb-4">Trending</h2>
          <div className=" flex gap-1">
          <div ref={ablumPrv} className=" m-4 mb-5 border border-white rounded-full cursor-pointer">
        <MdNavigateBefore size={35}  className="text-white text-xl" />
        </div>
        <div ref={albumNext} className=" m-4 mb-5 border border-white rounded-full cursor-pointer">
        <MdNavigateNext size={35}  className="text-white text-xl" />
        </div>
        </div>
        </div>
         <Swiper
          modules={[Pagination, Navigation, FreeMode, Mousewheel, Keyboard]}
          style={{
            "--swiper-navigation-size": "20px",
            "--swiper-navigation-color": "white",
          }}
          spaceBetween={5}
          // slidesPerView={8.3}
          breakpoints={{
            300:{slidesPerView:3.1,spaceBetween:10,},
            640:{slidesPerView:4.2,spaceBetween:10,},
            1024:{slidesPerView:6.3,spaceBetween:10,},
        }}
          mousewheel={{
            enabled: true,
            forceToAxis: true,
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          freeMode={true}
          navigation={
            {
               nextEl: albumNext.current,
              prevEl: ablumPrv.current,
          }
          }
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = ablumPrv.current;
            swiper.params.navigation.nextEl = albumNext.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="mySwiper"
        >
            {data?.trending?.songs?.map(
            (song,index) =>
            song?.type === "song" && (
                <SwiperSlide key={song?.id}>
                  <SongCard activeSong={activeSong} isPlaying={isPlaying} i={index} data={data?.trending?.songs} song={song} />
                </SwiperSlide>
              )
          )}

          {data?.trending?.albums?.map(
            (album) =>
              album?.type === "album" && (
                <SwiperSlide key={album?.id}>
                  <AlbumCard album={album} />
                </SwiperSlide>
              )
          )}
        </Swiper>
        </div>          
    </div>
  );
};

export default Home;
