import React from 'react'
import { Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {
  FreeMode,
  Navigation,
  Mousewheel,
  Keyboard,
  Virtual,
} from "swiper/modules";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useRef } from 'react';

const SwiperLayout = ({children,title}) => {
    const albumNext = useRef(null);
    const ablumPrv = useRef(null);

    const renderSlide = (slideData) => {
      // Extract the content of each SwiperSlide and return it
      return React.Children.map(slideData, (child) => {
        if (React.isValidElement(child) && child.type === SwiperSlide) {
          return child.props.children;
        }
        return null;
      });
    };

  return (
    <div className=" my-4 lg:mt-14">
    <div className=" flex justify-between">
      <h2 className=" text-white mt-4 text-2xl lg:text-3xl font-semibold mb-4 ">{title}</h2>
        <div className=" hidden md:flex gap-1">
        <div ref={ablumPrv} className=" m-4 mb-5 border border-white rounded-full cursor-pointer">
      <MdNavigateBefore size={35}  className="text-white text-xl" />
      </div>
      <div ref={albumNext} className=" m-4 mb-5 border border-white rounded-full cursor-pointer">
      <MdNavigateNext size={35}  className="text-white text-xl" />
      </div>
      </div>
      </div>
      <Swiper
        modules={[Navigation, FreeMode, Mousewheel, Keyboard, Virtual]}
        style={{
          "--swiper-navigation-size": "20px",
          "--swiper-navigation-color": "white",
        }}
        breakpoints={{
          300:{slidesPerView:3.1,spaceBetween: 5,},
          640:{slidesPerView:4.2,spaceBetween: 5,},
          1024:{slidesPerView:6,spaceBetween: 5,},
      }}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
        }}
        freeMode={true}
        navigation={
          {
             nextEl: albumNext.current,
            prevEl: ablumPrv.current,
        }
        }
        virtual={
          {
            enabled: true,
            slides: renderSlide(children),
            cache: true,
            addSlidesAfter: 4,
            addSlidesBefore: 4,
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
        {children}
      </Swiper>
      </div>
  )
}

export default SwiperLayout