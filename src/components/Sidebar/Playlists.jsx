"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { MdPlaylistPlay, MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import PlaylistModal from "./PlaylistModal";
import { deletePlaylist, getUserPlaylists } from "@/services/playlistApi";
import { toast } from "react-hot-toast";

const Playlists = ({ setShowNav }) => {
  const [show, setShow] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await getUserPlaylists();
      if (res?.success === true) {
        setPlaylists(res?.data?.playlists || []);
      }
    };
    getPlaylists();
  }, [show]);

  const handleDelete = async (id, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const res = await deletePlaylist(id);
    if (res?.success === true) {
      toast.success("Playlist deleted");
      setPlaylists((prev) => prev.filter((p) => p._id !== id));
    } else {
      toast.error(res?.message || "Failed to delete");
    }
  };

  return (
    <div className="py-3">
      <div className="flex items-center justify-between px-5 py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
          Playlists
        </span>
        <button
          type="button"
          onClick={() => setShow(true)}
          className="text-xs text-[#00e6e6] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-semibold py-1 px-2 rounded-md hover:bg-white/5"
          title="Create Playlist"
        >
          <FaPlus size={11} />
          <span>New</span>
        </button>
      </div>

      <div className="flex flex-col gap-1 max-h-56 overflow-y-auto hideScrollBar px-3 mt-1">
        {playlists && playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 text-gray-200 hover:text-white group transition-colors"
            >
              <Link
                href={`/myPlaylists/${playlist._id}`}
                onClick={() => setShowNav(false)}
                className="flex items-center gap-3 min-w-0 flex-1 mr-2"
              >
                <MdPlaylistPlay size={22} className="text-[#00e6e6] flex-shrink-0 transition-colors" />
                <span className="text-base font-semibold truncate">{playlist.name}</span>
              </Link>
              <button
                type="button"
                onClick={(e) => handleDelete(playlist._id, e)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-400 transition-all cursor-pointer rounded-lg hover:bg-white/10"
                title="Delete Playlist"
              >
                <MdOutlineDeleteOutline size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="py-4 px-2 text-left">
            <p className="text-sm text-gray-400 mb-2">No playlists yet</p>
            <button
              type="button"
              onClick={() => setShow(true)}
              className="text-sm text-[#00e6e6] hover:underline cursor-pointer font-semibold"
            >
              + Create playlist
            </button>
          </div>
        )}
      </div>

      <PlaylistModal show={show} setShow={setShow} />
    </div>
  );
};

export default Playlists;
