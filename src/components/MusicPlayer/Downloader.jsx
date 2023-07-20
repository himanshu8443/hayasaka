'use client';
import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md';
import useDownloader from 'react-use-downloader';

const Downloader = ({activeSong}) => {
    const { size, elapsed, percentage, download, error, isInProgress } =useDownloader();

    const songUrl = activeSong?.downloadUrl?.[4]?.link;
    const filename = `${activeSong?.name?.replace("&#039;","'")?.replace("&amp;","&")}.mp3`;

  return (
    <div onClick={(e)=>{e.stopPropagation();
        download(songUrl, filename);
    }} className={`flex  mb-1 cursor-pointer`}>
    <div title={isInProgress ?'Downloading' : 'Download'} className={isInProgress ? 'download-button flex justify-center items-center':''}>
        {
            isInProgress ? 
            <div className=' text-white font-extrabold text-xs m-'>{percentage}</div>
            :
            <MdOutlineFileDownload  size={25} color={'#ffff'}/>
        }
      </div>
    </div>
  )
}

export default Downloader