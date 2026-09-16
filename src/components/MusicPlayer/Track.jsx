import Link from "next/link";
import React from "react";

const decodeHtml = (str) => {
  if (!str) return "";
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};

const Track = ({ isPlaying, isActive, activeSong, fullScreen }) => {
  const primaryArtists = Array.isArray(activeSong?.artists?.primary)
    ? activeSong.artists.primary
    : Array.isArray(activeSong?.artists)
    ? activeSong.artists
    : [];

  const artistNames =
    primaryArtists.length > 0
      ? primaryArtists
          .map((artist) =>
            typeof artist === "string" ? artist.trim() : artist?.name?.trim()
          )
          .filter(Boolean)
          .join(", ")
      : typeof activeSong?.artists === "string"
      ? activeSong.artists
      : "Artist";

  return (
    <div
      className={`flex-1 flex items-center justify-start min-w-0 ${
        fullScreen ? "hidden" : ""
      }`}
    >
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_15s_linear_infinite]" : ""
        } h-11 w-11 sm:h-14 sm:w-14 mr-2.5 sm:mr-3.5 flex-shrink-0`}
      >
        <img
          src={
            activeSong?.image?.[2]?.url ||
            activeSong?.image?.[1]?.url ||
            activeSong?.image?.[0]?.url ||
            "https://avatars.githubusercontent.com/u/143804558?v=4"
          }
          alt="cover art"
          className="rounded-lg sm:rounded-full w-full h-full object-cover shadow-md border border-white/10"
        />
      </div>
      <div className="min-w-0 flex-1 select-none cursor-pointer pr-2">
        <p className="truncate text-white font-semibold sm:font-bold text-sm sm:text-base lg:text-lg leading-snug">
          {decodeHtml(activeSong?.name || "Song")}
        </p>
        <p className="truncate text-gray-300 text-xs sm:text-sm leading-snug mt-0.5">
          {artistNames}
        </p>
      </div>
    </div>
  );
};

export default Track;
