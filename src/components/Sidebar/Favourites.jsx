import Link from "next/link";
import React from "react";
import { AiFillHeart } from "react-icons/ai";

const Favourites = ({ setShowNav }) => {
  return (
    <Link
      href="/favourite"
      onClick={() => setShowNav(false)}
      className="flex items-center gap-3.5 px-5 py-3 text-white hover:text-[#00e6e6] hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
    >
      <AiFillHeart size={24} className="text-[#00e6e6]" />
      <span className="text-base font-semibold tracking-wide">Favourites</span>
    </Link>
  );
};

export default Favourites;
