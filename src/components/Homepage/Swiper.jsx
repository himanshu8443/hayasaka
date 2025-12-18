import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useRef } from "react";

const SwiperLayout = ({ children, title }) => {
  const albumNext = useRef(null);
  const ablumPrv = useRef(null);

  return (
    <div className=" my-4 lg:mt-14">
      <div className=" flex justify-between">
        <h2 className=" text-white mt-4 text-2xl lg:text-3xl font-semibold mb-4 ">
          {title}
        </h2>
        <div className=" hidden md:flex gap-1">
          <div
            ref={ablumPrv}
            className=" m-4 mb-5 border border-white rounded-full cursor-pointer"
          >
            <MdNavigateBefore size={35} className="text-white text-xl" />
          </div>
          <div
            ref={albumNext}
            className=" m-4 mb-5 border border-white rounded-full cursor-pointer"
          >
            <MdNavigateNext size={35} className="text-white text-xl" />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation, FreeMode, Mousewheel, Keyboard]}
        style={{
          "--swiper-navigation-size": "20px",
          "--swiper-navigation-color": "white",
        }}
        slidesPerView="auto"
        spaceBetween={10}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
        }}
        freeMode={true}
        navigation={{
          nextEl: albumNext.current,
          prevEl: ablumPrv.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = ablumPrv.current;
          swiper.params.navigation.nextEl = albumNext.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="mySwiper [&_.swiper-slide]:w-[120px] [&_.swiper-slide]:sm:w-[150px] [&_.swiper-slide]:lg:w-[180px] [&_.swiper-slide]:xl:w-[220px]"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperLayout;
