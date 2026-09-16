"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { createPlaylist } from "@/services/playlistApi";
import { useDispatch } from "react-redux";
import { setIsTyping } from "@/redux/features/loadingBarSlice";

const PlaylistModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!name.trim()) {
      toast.error("Playlist name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await createPlaylist(name.trim());
      if (res.success === true) {
        toast.success(res.message || "Playlist created");
        setName("");
        setShow(false);
      } else {
        toast.error(res.message || "Failed to create playlist");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => dispatch(setIsTyping(true));
  const handleBlur = () => dispatch(setIsTyping(false));

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0b1322] border border-white/15 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200 text-white"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-semibold text-white">Create Playlist</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Enter a name for your new collection
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer outline-none focus:outline-none"
            title="Close"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreate} className="mt-5 space-y-4">
          <div>
            <label htmlFor="playlist-name" className="block text-xs font-medium text-gray-300 mb-1.5">
              Playlist Name
            </label>
            <input
              id="playlist-name"
              type="text"
              value={name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="My Favorite Hits..."
              autoFocus
              className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00e6e6] focus:ring-1 focus:ring-[#00e6e6] transition-all"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#00e6e6] text-black hover:bg-[#00cccc] hover:shadow-[0_0_15px_rgba(0,230,230,0.3)] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaPlus size={12} />
              )}
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaylistModal;