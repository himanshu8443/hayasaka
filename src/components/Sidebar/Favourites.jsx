import Link from "next/link";
import React from "react";
import { AiFillHeart } from "react-icons/ai";

const Favourites = ({ setShowNav }) => {
  return (
    <div className=" pt-5 m-2 rounded-md w-[95%] hover:bg-white/5">
      <Link
        href="/favourite"
        className="flex cursor-pointer items-center"
        onClick={() => setShowNav(false)}
      >
        <p className=" font-semibold text-lg text-white mx-3 mb-7">
          Favourites
        </p>
        <AiFillHeart
          title="Favourites"
          size={25}
          color={"white"}
          className={` mb-7 `}
        />
      </Link>
    </div>
  );
};

export default Favourites;
