"use client";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsTyping } from "@/redux/features/loadingBarSlice";

const Searchbar = ({ mobileSearchOpen, setMobileSearchOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    if (searchTerm === "") {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
  };
  const handleFocus = () => {
    dispatch(setIsTyping(true));
  };
  const handleBlur = () => {
    dispatch(setIsTyping(false));
  };

  useEffect(() => {
    if (!mobileSearchOpen) {
      setSearchTerm("");
    }
  }, [mobileSearchOpen]);

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    handleBlur();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileSearchOpen(true)}
        className={`mr-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#00e6e6] hover:text-[#00e6e6] md:hidden ${
          mobileSearchOpen ? "hidden" : ""
        }`}
        aria-label="Open search"
      >
        <FiSearch className="h-5 w-5" />
      </button>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={`text-gray-400 transition-all duration-300 focus-within:text-gray-600 ${
          mobileSearchOpen
            ? "fixed inset-x-0 top-0 z-50 flex h-[70px] w-screen items-center bg-[#020813] px-3 md:static md:z-auto md:h-auto md:w-auto md:bg-transparent md:px-0"
            : "hidden md:ml-auto md:flex md:items-center md:px-2 md:w-auto"
        }`}
      >
        <label htmlFor="search-field" className="sr-only">
          Search all files
        </label>

        <div
          className={`flex items-center transition-all duration-300 ${
            mobileSearchOpen
              ? "w-full gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2"
              : "gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 md:w-[11rem] lg:w-[14rem] focus-within:w-[14rem] lg:focus-within:w-[18rem]"
          }`}
        >
          <FiSearch aria-hidden="true" className="h-5 w-5 text-gray-300" />
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="search-field"
            autoComplete="off"
            id="search-field"
            className={`min-w-0 flex-1 bg-transparent outline-none text-base text-white placeholder-gray-300 transition-all duration-300 ${
              mobileSearchOpen
                ? "w-full py-1"
                : "w-full py-2 md:py-0 md:text-[15px]"
            }`}
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && mobileSearchOpen) {
                closeMobileSearch();
              }
            }}
          />

          {mobileSearchOpen ? (
            <button
              type="button"
              onClick={closeMobileSearch}
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-[#00e6e6] hover:text-[#00e6e6] md:hidden"
              aria-label="Close search"
            >
              <IoClose className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default Searchbar;
