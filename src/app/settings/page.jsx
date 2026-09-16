"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAutoOpenFullscreen,
  setDefaultDownloadQuality,
  setLyricsMode,
  setSeparateLrcFile,
} from "@/redux/features/settingsSlice";
import ToggleSwitch from "@/components/Settings/ToggleSwitch";
import CustomSelect from "@/components/Settings/CustomSelect";

const QUALITY_OPTIONS = [
  { value: "ask", label: "Always ask" },
  { value: 4, label: "320 kbps (HQ)" },
  { value: 3, label: "160 kbps" },
  { value: 2, label: "96 kbps" },
  { value: 1, label: "48 kbps" },
  { value: 0, label: "12 kbps" },
];

const LYRICS_OPTIONS = [
  { value: "synced", label: "Synced (LRC)" },
  { value: "plain", label: "Plain text (Unsynced)" },
  { value: "none", label: "Do not embed" },
];

const SettingsPage = () => {
  const dispatch = useDispatch();
  const {
    autoOpenFullscreen,
    defaultDownloadQuality,
    lyricsMode = "synced",
    separateLrcFile = false,
  } = useSelector(
    (state) =>
      state.settings || {
        autoOpenFullscreen: false,
        defaultDownloadQuality: "ask",
        lyricsMode: "synced",
        separateLrcFile: false,
      }
  );

  const handleFullscreenToggle = (checked) => {
    dispatch(setAutoOpenFullscreen(checked));
  };

  const handleQualityChange = (val) => {
    dispatch(setDefaultDownloadQuality(val === "ask" ? "ask" : Number(val)));
  };

  const handleLyricsModeChange = (val) => {
    dispatch(setLyricsMode(val));
  };

  const handleSeparateLrcToggle = (checked) => {
    dispatch(setSeparateLrcFile(checked));
  };

  return (
    <div className="w-11/12 max-w-2xl mt-14 sm:mt-16 mx-auto text-white min-h-screen pb-32">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage playback behavior and download preferences
        </p>
      </div>

      {/* Settings Card */}
      <div className="bg-[#030d1a]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-5 sm:p-7 space-y-6">
        {/* Auto-open Fullscreen Player */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
          <div className="space-y-1">
            <h2 className="text-base font-medium text-white">
              Auto-open fullscreen player
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Automatically expand player when a song starts playing
            </p>
          </div>
          <div className="flex-shrink-0 self-end sm:self-center">
            <ToggleSwitch
              checked={Boolean(autoOpenFullscreen)}
              onChange={handleFullscreenToggle}
              label="Auto-open fullscreen player"
            />
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Default Download Quality */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
          <div className="space-y-1">
            <h2 className="text-base font-medium text-white">
              Default download quality
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Preferred bitrate for audio downloads
            </p>
          </div>
          <div className="flex-shrink-0 self-start sm:self-center">
            <CustomSelect
              value={defaultDownloadQuality ?? "ask"}
              onChange={handleQualityChange}
              options={QUALITY_OPTIONS}
            />
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Embed Lyrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
          <div className="space-y-1">
            <h2 className="text-base font-medium text-white">
              Embed lyrics in downloads
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Embed synced or plain lyrics into downloaded audio files
            </p>
          </div>
          <div className="flex-shrink-0 self-start sm:self-center">
            <CustomSelect
              value={lyricsMode ?? "synced"}
              onChange={handleLyricsModeChange}
              options={LYRICS_OPTIONS}
            />
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Save Separate .lrc File */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
          <div className="space-y-1">
            <h2 className="text-base font-medium text-white">
              Save separate lyric file (.lrc)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Download a matching .lrc file alongside the song for external players
            </p>
          </div>
          <div className="flex-shrink-0 self-end sm:self-center">
            <ToggleSwitch
              checked={Boolean(separateLrcFile)}
              onChange={handleSeparateLrcToggle}
              label="Save separate lyric file (.lrc)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
