import React from "react";
import logoWhite from "../../assets/logoWhite.png";
import Languages from "./Languages";
import Favourites from "./Favourites";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import Playlists from "./Playlists";
import { setProgress } from "@/redux/features/loadingBarSlice";

const Sidebar = ({ showNav, setShowNav }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        showNav ? "" : "translate-x-[-100%]"
      } transition-all duration-200  h-screen lg:w-[300px] md:w-[250px] w-[65vw] fixed top-0 left-0 z-40 bg-[#020813] flex flex-col justify-between`}
    >
      <div>
        <div className=" flex mt-3">
          <MdOutlineMenu
            onClick={() => setShowNav(false)}
            className=" mx-4 text-2xl lg:text-3xl my-auto text-white cursor-pointer"
          />
          <div className=" flex justify-center items-center">
            <Link href="/">
              <Image
                onClick={() => {
                  dispatch(setProgress(100));
                }}
                src={logoWhite}
                alt="logo"
                className=" lg:py-2  aspect-video w-[139px] h-[31px] lg:h-[62px] lg:w-[190px]"
              />
            </Link>
          </div>
        </div>
        <div className=" mt-7 pb-7 border-b border-gray-400 w-[95%]">
          <Profile setShowNav={setShowNav} />
        </div>
        <div className="flex flex-col gap-1">
          <Languages />
          <hr className="border-gray-400 w-[95%] mx-auto" />
        </div>
        <Favourites setShowNav={setShowNav} />
        <div className="flex flex-col gap-1">
          <hr className="border-gray-400 w-[95%] mx-auto" />
          <Playlists setShowNav={setShowNav} />
          <hr className="border-gray-400 w-[95%] mx-auto" />
        </div>
      </div>
      <div className=" mb-28 text-gray-200 mx-3 flex gap-3">
        <Link href="/dmca">
          <p className="hover:border border-gray-200 p-1 font-medium w-fit rounded cursor-pointer text-sm">
            DMCA
          </p>
        </Link>
        <a
          href="https://github.com/himanshu8443/hayasaka"
          target="_blank"
          rel="noreferrer"
        >
          <p className=" hover:border border-gray-200 p-1 font-medium w-fit rounded cursor-pointer text-sm flex items-center gap-1">
            <FaGithub />
            Github
          </p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
