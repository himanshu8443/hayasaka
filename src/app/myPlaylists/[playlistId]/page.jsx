"use client";
import SongsList from "@/components/SongsList";
import BulkDownloadButton from "@/components/BulkDownloadButton";
import { getSongData } from "@/services/dataAPI";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getSinglePlaylist } from "@/services/playlistApi";

const page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState({});
  const { status } = useSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const res = await getSinglePlaylist(params.playlistId);
      if (res?.success === true) {
        setPlaylist(res?.data);
        if (res?.data?.songs?.length > 0) {
          const newSongs = await getSongData(res?.data?.songs);
          setSongs(newSongs?.reverse());
        }
      }
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  // redirect if user is authenticated
  if (status === "loading") {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }
  return (
    <div className="mx-auto relative flex flex-col w-11/12 text-white min-h-screen ">
      <h1 className="text-6xl font-semibold mt-10">{playlist?.name}</h1>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold">Songs</h2>
        {songs?.length > 0 && (
          <div className="self-start sm:self-auto">
            <BulkDownloadButton songList={{ name: playlist?.name, songs }} />
          </div>
        )}
      </div>
      {songs?.length === 0 && loading === false ? (
        <h1 className="text-xl font-semibold mt-10">Playlist is Empty</h1>
      ) : (
        <SongsList
          SongData={songs}
          loading={false}
          playlistID={playlist?._id}
          isUserPlaylist={true}
          setSongs={setSongs}
        />
      )}
    </div>
  );
};

export default page;
