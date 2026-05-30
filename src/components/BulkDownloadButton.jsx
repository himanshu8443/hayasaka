"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MdCheckCircleOutline,
  MdDownloadForOffline,
  MdOutlineAutorenew,
} from "react-icons/md";
import { toast } from "react-hot-toast";
import {
  QUALITY_OPTIONS,
  buildTagInput,
  downloadBlob,
  getCoverType,
  sanitize,
} from "./MusicPlayer/downloadUtils";

const BulkDownloadButton = ({ songList }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const resetTimerRef = useRef(null);

  const songs = songList?.songs || songList || [];
  const downloadTitle = songList?.name || "songs";

  const updateMenuPosition = () => {
    if (typeof window === "undefined" || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setMenuPosition({
      top: Math.max(8, rect.top - 8),
      right: Math.max(8, window.innerWidth - rect.right),
    });
  };

  useEffect(() => {
    if (!showMenu) return;

    const handler = (e) => {
      const clickedButton = buttonRef.current?.contains(e.target);
      const clickedMenu = menuRef.current?.contains(e.target);

      if (!clickedButton && !clickedMenu) {
        setShowMenu(false);
      }
    };

    updateMenuPosition();
    document.addEventListener("mousedown", handler);
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      document.removeEventListener("mousedown", handler);
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [showMenu]);

  const handleBulkDownload = async (quality) => {
    setShowMenu(false);

    if (!songs.length) {
      toast.error("No songs available to download");
      return;
    }

    setDownloading(true);
    setCompleted(false);
    setProgress(0);

    try {
      const [{ default: JSZip }, { applyCoverArt, applyTags }] =
        await Promise.all([import("jszip"), import("taglib-wasm/simple")]);

      const zip = new JSZip();
      const folderName = sanitize(downloadTitle) || "download";
      const folder = zip.folder(folderName) || zip;
      const availableSongs = songs.filter(
        (song) => song?.downloadUrl?.[quality.index]?.url,
      );

      if (!availableSongs.length) {
        toast.error("No downloads available for this quality");
        return;
      }

      for (let index = 0; index < songs.length; index += 1) {
        const song = songs[index];
        const songUrl = song?.downloadUrl?.[quality.index]?.url;

        if (!songUrl) {
          continue;
        }

        const audioRes = await fetch(songUrl);
        if (!audioRes.ok) {
          continue;
        }

        const audioBuffer = await audioRes.arrayBuffer();
        let taggedBuffer = await applyTags(
          new Uint8Array(audioBuffer),
          buildTagInput(song),
        );

        const coverUrl =
          song?.image?.[2]?.url ||
          song?.image?.[1]?.url ||
          song?.image?.[0]?.url;

        if (coverUrl) {
          try {
            const imgRes = await fetch(coverUrl);
            if (imgRes.ok) {
              const imgBuffer = await imgRes.arrayBuffer();
              taggedBuffer = await applyCoverArt(
                taggedBuffer,
                new Uint8Array(imgBuffer),
                getCoverType(imgRes.headers.get("content-type")),
              );
            }
          } catch {
            // Keep the audio file even if artwork fetch fails.
          }
        }

        const fileName = `${sanitize(song?.name) || "track"}.m4a`;
        folder.file(fileName, taggedBuffer);
        setProgress(Math.round(((index + 1) / songs.length) * 85));
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, `${folderName}.zip`);
      setProgress(100);
      setCompleted(true);
      toast.success(
        `Downloaded ${availableSongs.length} songs from ${folderName}`,
      );

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = setTimeout(() => {
        setCompleted(false);
        setProgress(0);
      }, 2500);
    } catch (error) {
      console.error("Bulk download error:", error);
      toast.error("Bulk download failed. Please try again.");
    } finally {
      setDownloading(false);
      if (!completed) {
        setProgress(0);
      }
    }
  };

  const availableQualities = QUALITY_OPTIONS.filter((quality) =>
    songs.some((song) => song?.downloadUrl?.[quality.index]?.url),
  );

  return (
    <div className="relative flex cursor-pointer" ref={buttonRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!downloading) {
            setShowMenu((prev) => {
              const next = !prev;
              if (next) updateMenuPosition();
              return next;
            });
          }
        }}
        title={downloading ? "Downloading" : `Download ${downloadTitle}`}
        aria-label={downloading ? "Downloading" : `Download ${downloadTitle}`}
        className={`relative overflow-hidden flex h-12 w-full sm:w-auto sm:min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/25 px-5 sm:px-6 text-gray-100 shadow-[0_0_28px_rgba(0,230,230,0.12)] transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#00e6e6]/20 sm:min-w-[260px] ${
          downloading
            ? "cursor-not-allowed bg-slate-800"
            : completed
              ? "bg-emerald-500/20 border-emerald-400/40 shadow-[0_0_24px_rgba(16,185,129,0.16)]"
              : "bg-[#06131f] hover:border-[#00e6e6]/70 hover:shadow-[0_0_30px_rgba(0,230,230,0.18)]"
        }`}
      >
        <div
          className={`absolute inset-y-0 left-0 transition-[width,background-color] duration-150 ease-out ${
            downloading
              ? "bg-[#00e6e6]/25"
              : completed
                ? "bg-emerald-500/45"
                : "bg-transparent"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />

        <div className="relative z-10 flex w-full items-center justify-center gap-3 pointer-events-none font-medium tracking-wide">
          {downloading ? (
            <>
              <MdOutlineAutorenew size={24} className="animate-spin" />
              <span className="text-sm sm:text-base lg:text-lg">
                Downloading... {progress}%
              </span>
            </>
          ) : completed ? (
            <>
              <MdCheckCircleOutline size={24} />
              <span className="text-sm sm:text-base lg:text-lg">Completed</span>
            </>
          ) : (
            <>
              <MdDownloadForOffline
                size={24}
                className="group-hover:text-[#00e6e6]"
              />
              <span className="text-sm sm:text-base lg:text-lg">Download</span>
            </>
          )}
        </div>
      </button>

      {showMenu && menuPosition && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a2e] border border-white/10 rounded-lg shadow-xl backdrop-blur-md z-[9999] min-w-[160px] overflow-hidden animate-fade-in"
              style={{
                position: "fixed",
                top: `${menuPosition.top}px`,
                right: `${menuPosition.right}px`,
                transform: "translateY(-100%)",
              }}
            >
              <div className="px-3 py-2 text-xs text-white/50 font-semibold uppercase tracking-wider border-b border-white/10">
                Bulk download quality
              </div>
              {availableQualities.map((quality) => (
                <button
                  key={quality.index}
                  onClick={() => handleBulkDownload(quality)}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 hover:text-[#00e6e6] transition-colors flex items-center justify-between gap-2"
                >
                  <span>{quality.label}</span>
                  {quality.index === 4 && (
                    <span className="text-[10px] bg-[#00e6e6]/20 text-[#00e6e6] px-1.5 py-0.5 rounded-full font-medium">
                      HQ
                    </span>
                  )}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default BulkDownloadButton;
