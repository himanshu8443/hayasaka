"use client";
import React from "react";
import logoWhite from "../../assets/logoWhite.png";
import Languages from "./Languages";
import Favourites from "./Favourites";
import Playlists from "./Playlists";
import Profile from "./Profile";
import SettingsLink from "./SettingsLink";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setProgress } from "@/redux/features/loadingBarSlice";

const Sidebar = ({ showNav, setShowNav }) => {
  const dispatch = useDispatch();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-[290px] sm:w-[320px] max-w-[85vw] z-50 transition-transform duration-200 ease-out flex flex-col bg-[#020813] border-r border-white/10 shadow-2xl ${
        showNav ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header — matched exactly with Navbar logo size & placement */}
      <div className="h-[70px] flex items-center border-b border-white/10 flex-shrink-0">
        <MdOutlineMenu
          onClick={() => setShowNav(false)}
          className="mx-4 text-2xl lg:text-3xl my-auto text-white cursor-pointer"
        />
        <div className="flex justify-center items-center">
          <Link href="/">
            <Image
              onClick={() => {
                setShowNav(false);
                dispatch(setProgress(100));
              }}
              src={logoWhite}
              alt="logo"
              className="lg:py-2 aspect-video w-[135px] h-[30.741px] lg:h-[58px] lg:w-[190px]"
            />
          </Link>
        </div>
      </div>

      {/* Navigation Body */}
      <div className="flex-1 min-h-0 overflow-y-auto hideScrollBar py-2">
        <Profile setShowNav={setShowNav} />
        <div className="py-2">
          <Favourites setShowNav={setShowNav} />
        </div>
        <Playlists setShowNav={setShowNav} />
        <Languages />
      </div>

      {/* Settings pinned at end */}
      <div className="border-t border-white/10 py-1 flex-shrink-0">
        <SettingsLink setShowNav={setShowNav} />
      </div>

      {/* Footer */}
      <div className="px-5 py-4 pb-24 border-t border-white/10 flex items-center justify-between text-sm text-gray-400 flex-shrink-0">
        <div className="flex gap-5">
          <Link
            href="/dmca"
            onClick={() => setShowNav(false)}
            className="hover:text-white transition-colors"
          >
            DMCA
          </Link>
          <a
            href="https://github.com/himanshu8443/hayasaka"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FaGithub size={15} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
