"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdOutlineFileDownload, MdDownloadForOffline } from "react-icons/md";
import { toast } from "react-hot-toast";
import {
  QUALITY_OPTIONS,
  buildTagInput,
  downloadBlob,
  getCoverType,
  sanitize,
} from "./downloadUtils";

const Downloader = ({ activeSong, icon }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(null);

  const updateMenuPosition = () => {
    if (typeof window === "undefined" || !menuButtonRef.current) return;

    const rect = menuButtonRef.current.getBoundingClientRect();
    setMenuPosition({
      top: Math.max(8, rect.top - 8),
      right: Math.max(8, window.innerWidth - rect.right),
    });
  };

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e) => {
      const clickedButton = menuButtonRef.current?.contains(e.target);
      const clickedMenu = menuPanelRef.current?.contains(e.target);

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

  const handleDownload = async (quality) => {
    setShowMenu(false);
    setDownloading(true);
    setProgress(0);

    try {
      const songUrl = activeSong?.downloadUrl?.[quality.index]?.url;
      if (!songUrl) {
        toast.error("Download URL not available for this quality");
        return;
      }

      setProgress(10);

      // Fetch the audio file
      const audioRes = await fetch(songUrl);
      if (!audioRes.ok) throw new Error("Failed to fetch audio");
      const audioBuffer = await audioRes.arrayBuffer();
      setProgress(40);

      const songName = sanitize(activeSong?.name);
      const { applyCoverArt, applyTags } = await import("taglib-wasm/simple");
      let taggedBuffer = await applyTags(
        new Uint8Array(audioBuffer),
        buildTagInput(activeSong),
      );

      setProgress(60);

      // Fetch and embed cover art
      const coverUrl =
        activeSong?.image?.[2]?.url ||
        activeSong?.image?.[1]?.url ||
        activeSong?.image?.[0]?.url;

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
          // Cover art fetch failed, continue with audio metadata.
        }
      }

      setProgress(80);

      downloadBlob(
        new Blob([taggedBuffer], { type: "audio/mp4" }),
        `${songName}.m4a`,
      );

      setProgress(100);
      toast.success(`Downloaded "${songName}" (${quality.label})`);
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Download failed. Please try again.");
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  // Filter to only available qualities
  const availableQualities = QUALITY_OPTIONS.filter(
    (q) => activeSong?.downloadUrl?.[q.index]?.url,
  );

  return (
    <div className="relative flex mb-1 cursor-pointer w-7" ref={menuButtonRef}>
      <div
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
        title={downloading ? "Downloading" : "Download"}
        className={
          downloading ? "download-button flex justify-center items-center" : ""
        }
      >
        {downloading ? (
          <div className="text-white font-extrabold text-xs">{progress}%</div>
        ) : icon === 2 ? (
          <MdDownloadForOffline size={25} color={"#fff"} />
        ) : (
          <MdOutlineFileDownload size={25} color={"#fff"} />
        )}
      </div>

      {/* Quality selection menu */}
      {showMenu && menuPosition && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuPanelRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a2e] border border-white/10 rounded-lg shadow-xl backdrop-blur-md z-[9999] min-w-[140px] overflow-hidden animate-fade-in"
              style={{
                position: "fixed",
                top: `${menuPosition.top}px`,
                right: `${menuPosition.right}px`,
                transform: "translateY(-100%)",
              }}
            >
              <div className="px-3 py-2 text-xs text-white/50 font-semibold uppercase tracking-wider border-b border-white/10">
                Quality
              </div>
              {availableQualities.map((q) => (
                <button
                  key={q.index}
                  onClick={() => handleDownload(q)}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 hover:text-[#00e6e6] transition-colors flex items-center justify-between gap-2"
                >
                  <span>{q.label}</span>
                  {q.index === 4 && (
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

export default Downloader;
