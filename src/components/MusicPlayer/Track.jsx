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
      {/* Vinyl Record Player Unit */}
      <div className="relative flex-shrink-0 mr-2.5 sm:mr-3.5 select-none group">
        {/* Turntable Tonearm (Needle Stylus) */}
        <div
          className="absolute -top-1.5 -right-1 sm:-top-2 sm:-right-1.5 w-6 h-9 sm:w-7 sm:h-11 z-20 pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transformOrigin: "64.3% 9.1%",
            transform: isPlaying && isActive ? "rotate(0deg)" : "rotate(-32deg)",
          }}
        >
          <svg
            viewBox="0 0 28 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            {/* Pivot Base */}
            <circle cx="18" cy="4" r="3.5" fill="#27272a" stroke="#71717a" strokeWidth="1" />
            <circle cx="18" cy="4" r="1.5" fill="#e4e4e7" />
            {/* Tonearm Metallic Bar */}
            <path
              d="M18 5 L15.5 20 L8 34"
              stroke="#d4d4d8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Cartridge / Headshell */}
            <path
              d="M9 32 L4 38 L6 40 L11 34 Z"
              fill="#18181b"
              stroke="#71717a"
              strokeWidth="0.8"
            />
            {/* Stylus Needle Tip Accent */}
            <circle cx="4.5" cy="38.5" r="0.9" fill="#00e6e6" />
          </svg>
        </div>

        {/* Vinyl Record Disc */}
        <div
          className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.6)] border border-white/15 overflow-hidden animate-[spin_10s_linear_infinite]"
          style={{
            animationPlayState: isPlaying && isActive ? "running" : "paused",
          }}
        >
          {/* Full Cover Artwork (Picture Disc) */}
          <img
            src={
              activeSong?.image?.[2]?.url ||
              activeSong?.image?.[1]?.url ||
              activeSong?.image?.[0]?.url ||
              "https://avatars.githubusercontent.com/u/143804558?v=4"
            }
            alt="cover art"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Concentric Vinyl Grooves (SVG Overlay) */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          </svg>

          {/* Vinyl Specular Light Sheen (Conic Gloss Highlight) */}
          <div
            className="absolute inset-0 w-full h-full rounded-full pointer-events-none opacity-30"
            style={{
              background:
                "conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.28) 35deg, transparent 70deg, transparent 180deg, rgba(255,255,255,0.28) 215deg, transparent 250deg, transparent 360deg)",
            }}
          />

          {/* Turntable Spindle Center Hole */}
          <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#020813] border border-white/70 shadow-inner ring-1 ring-black/80 pointer-events-none z-10" />
        </div>
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
