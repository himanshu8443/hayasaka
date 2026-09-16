"use client";
import React from "react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";

const SettingsLink = ({ setShowNav }) => {
  return (
    <Link
      href="/settings"
      onClick={() => setShowNav(false)}
      className="flex items-center gap-3.5 px-5 py-3 text-white hover:text-[#00e6e6] hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
    >
      <IoSettingsOutline size={22} className="text-[#00e6e6]" />
      <span className="text-base font-semibold tracking-wide">Settings</span>
    </Link>
  );
};

export default SettingsLink;
