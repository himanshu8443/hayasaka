"use client";
import SongsList from "@/components/SongsList";
import BulkDownloadButton from "@/components/BulkDownloadButton";
import { getFavourite, getSongData } from "@/services/dataAPI";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const res = await getFavourite();
      if (res?.length > 0) {
        const favorites = await getSongData(res);
        setFavouriteSongs(favorites?.reverse());
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
      <h1 className="text-6xl font-semibold mt-10">Favourites</h1>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold">Songs</h2>
        {favouriteSongs?.length > 0 && (
          <div className="self-start sm:self-auto">
            <BulkDownloadButton songList={favouriteSongs} />
          </div>
        )}
      </div>
      {favouriteSongs?.length <= 0 && loading === false ? (
        <h1 className="text-xl font-semibold mt-10">No Favourite Songs</h1>
      ) : (
        <SongsList SongData={favouriteSongs} loading={loading} />
      )}
    </div>
  );
};

export default page;
