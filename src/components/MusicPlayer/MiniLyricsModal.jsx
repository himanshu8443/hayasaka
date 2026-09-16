"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { getlyricsData } from "@/services/dataAPI";
import { IoClose, IoMusicalNotesOutline } from "react-icons/io5";
import { TbMicrophone2 } from "react-icons/tb";

const parseLrc = (lrcString) => {
  if (!lrcString || typeof lrcString !== "string") return [];
  const lines = lrcString.split("\n");
  const result = [];
  const regex = /\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\](.*)/;

  for (let i = 0; i < lines.length; i++) {
    const match = regex.exec(lines[i].trim());
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const text = match[3].trim();
      const time = minutes * 60 + seconds;
      if (text) {
        result.push({ id: i, time, text });
      }
    }
  }
  return result.sort((a, b) => a.time - b.time);
};

const MiniLyricsModal = ({
  isOpen,
  onClose,
  activeSong,
  appTime = 0,
  setSeekTime,
  bgColor,
}) => {
  const [lyricsData, setLyricsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;
    const fetchLyrics = async () => {
      setLoading(true);
      try {
        const res = await getlyricsData(activeSong);
        if (!isCancelled) {
          setLyricsData(res);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setLyricsData(null);
          setLoading(false);
        }
      }
    };

    if (isOpen && (activeSong?.name || activeSong?.id)) {
      fetchLyrics();
    }
    return () => {
      isCancelled = true;
    };
  }, [isOpen, activeSong?.id, activeSong?.name, activeSong?.duration]);

  const parsedLyrics = useMemo(() => {
    if (lyricsData?.syncedLyrics) {
      return parseLrc(lyricsData.syncedLyrics);
    }
    return [];
  }, [lyricsData?.syncedLyrics]);

  const activeLineIndex = useMemo(() => {
    if (!parsedLyrics.length) return -1;
    let index = -1;
    for (let i = 0; i < parsedLyrics.length; i++) {
      if (appTime >= parsedLyrics[i].time) {
        index = i;
      } else {
        break;
      }
    }
    return index;
  }, [parsedLyrics, appTime]);

  const handleUserScroll = () => {
    setIsUserInteracting(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2500);
  };

  useEffect(() => {
    if (isUserInteracting) return;
    if (activeLineRef.current && isOpen) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLineIndex, isUserInteracting, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-24 right-4 sm:right-8 w-[320px] sm:w-[380px] h-[440px] max-h-[70vh] rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200"
        style={{
          backgroundColor: bgColor
            ? `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.2)`
            : "rgba(0,0,0,0.2)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <TbMicrophone2 className="text-[#00e6e6] text-xl flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {activeSong?.name || "Lyrics"}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {parsedLyrics.length > 0 ? "Synced Lyrics" : "Lyrics"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.currentTarget.blur();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors outline-none focus:outline-none focus:ring-0"
            title="Close"
          >
            <IoClose size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="w-full flex-1 min-h-0 overflow-y-auto hideScrollBar flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3 py-12">
              <div className="w-7 h-7 border-2 border-[#00e6e6] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs">Loading lyrics...</p>
            </div>
          ) : lyricsData?.instrumental ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3 p-6 text-center">
              <IoMusicalNotesOutline className="text-4xl text-[#00e6e6] animate-pulse" />
              <p className="text-base font-semibold text-white">
                Instrumental Track
              </p>
              <p className="text-xs text-gray-400">This song has no lyrics.</p>
            </div>
          ) : parsedLyrics.length > 0 ? (
            <div
              ref={containerRef}
              onScroll={handleUserScroll}
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)",
              }}
              className="w-full flex-1 min-h-0 overflow-y-auto hideScrollBar px-4 py-8 flex flex-col gap-4 text-left"
            >
              {parsedLyrics.map((line, idx) => {
                const isActive = idx === activeLineIndex;
                const isPast = idx < activeLineIndex;
                return (
                  <p
                    key={line.id}
                    ref={isActive ? activeLineRef : null}
                    onClick={() => {
                      if (setSeekTime) setSeekTime(line.time);
                    }}
                    className={`cursor-pointer select-none transition-all duration-300 ease-out origin-left leading-relaxed ${
                      isActive
                        ? "text-white font-bold text-lg scale-[1.02] opacity-100"
                        : isPast
                        ? "text-white/50 font-medium text-sm opacity-50 hover:opacity-90 hover:text-white"
                        : "text-white/40 font-medium text-sm opacity-40 hover:opacity-80 hover:text-white"
                    }`}
                  >
                    {line.text}
                  </p>
                );
              })}
            </div>
          ) : lyricsData?.plainLyrics ? (
            <div className="w-full flex-1 min-h-0 overflow-y-auto hideScrollBar text-white/90 text-sm px-4 py-4 text-left whitespace-pre-line leading-relaxed">
              {lyricsData.plainLyrics}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-1 p-6 text-center">
              <p className="text-sm font-medium text-gray-300">
                No Lyrics Found
              </p>
              <p className="text-xs text-gray-500">
                Couldn't find lyrics on lrclib.net
              </p>
            </div>
          )}
        </div>
      </div>,
    document.body
  );
};

export default MiniLyricsModal;
