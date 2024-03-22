"use client";
import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import useDownloader from "react-use-downloader";
import { MdDownloadForOffline } from "react-icons/md";

const Downloader = ({ activeSong, icon }) => {
  const { size, elapsed, percentage, download, error, isInProgress } =
    useDownloader();

  const songUrl = activeSong?.downloadUrl?.[4]?.url;
  const filename = `${activeSong?.name
    ?.replace("&#039;", "'")
    ?.replace("&amp;", "&")}.mp3`;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        download(songUrl, filename);
      }}
      className={`flex  mb-1 cursor-pointer w-7`}
    >
      <div
        title={isInProgress ? "Downloading" : "Download"}
        className={
          isInProgress ? "download-button flex justify-center items-center" : ""
        }
      >
        {isInProgress ? (
          <div className=" text-white font-extrabold text-xs m-">
            {percentage}
          </div>
        ) : icon === 2 ? (
          <MdDownloadForOffline size={25} color={"#ffff"} />
        ) : (
          <MdOutlineFileDownload size={25} color={"#ffff"} />
        )}
      </div>
    </div>
  );
};

export default Downloader;
